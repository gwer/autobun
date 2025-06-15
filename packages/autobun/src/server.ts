import * as path from 'path';
import { watch } from 'fs';
import fsPromises from 'fs/promises';
import type { ServeOptions } from 'bun';
import { getAllProps } from './pageProps';
import { renderPage } from './page';
import { isPagePropsNotFound, isPagePropsRedirect } from './types';
import { getConfig } from './config';

const PROJECT_ROOT = process.cwd();
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, 'public');
const BUILDED_PAGES_DIR = path.resolve(PROJECT_ROOT, '.autobun/server/pages');

const generateETag = (content: Uint8Array): string => {
  return Bun.hash(content).toString(16);
};

export default ({ dev }: { dev: boolean }) => {
  const buildRouter = new Bun.FileSystemRouter({
    dir: BUILDED_PAGES_DIR,
    style: 'nextjs',
  });

  // Version is used to invalidate the module cache
  let version = 0;

  if (dev) {
    watch(BUILDED_PAGES_DIR, { recursive: true }, (event, filename) => {
      version++;
      buildRouter.reload();
    });
  }

  const serveFromDir = async (config: {
    directory: string;
    path: string;
    request?: Request;
  }): Promise<Response | null> => {
    let basePath = path.join(config.directory, config.path);

    try {
      const stat = await fsPromises.stat(basePath).catch(() => null);

      if (stat && stat.isFile()) {
        const file = Bun.file(basePath);
        const content = await file.arrayBuffer();
        const etag = generateETag(new Uint8Array(content));

        // Check if client's cached version is still valid
        if (config.request) {
          const ifNoneMatch = config.request.headers.get('If-None-Match');
          if (ifNoneMatch === etag) {
            return new Response(null, { status: 304 });
          }
        }

        const headers = new Headers({
          'Content-Type': file.type,
          ETag: etag,
          'Cache-Control': 'no-cache',
        });

        const isGzipStaticEnabled = getConfig().isGzipStaticEnabled;

        // Check if client accepts gzip encoding
        if (
          isGzipStaticEnabled &&
          config.request?.headers.get('Accept-Encoding')?.includes('gzip')
        ) {
          const compressed = await Bun.gzipSync(new Uint8Array(content));
          headers.set('Content-Encoding', 'gzip');

          return new Response(compressed, { headers });
        }

        return new Response(file, { headers });
      }
    } catch (_) {
      return new Response('Unknown error', {
        status: 500,
      });
    }

    return null;
  };

  return {
    async fetch(request) {
      const documentPath = path.resolve(BUILDED_PAGES_DIR, '_document.js');
      const appPath = path.resolve(BUILDED_PAGES_DIR, '_app.js');
      const match = buildRouter.match(request);
      if (match) {
        if (match.src.split('/').some((part) => part.startsWith('_'))) {
          return new Response('File not found', {
            status: 404,
          });
        }

        const props = await getAllProps(match, appPath, version, request);

        if (isPagePropsNotFound(props)) {
          return new Response('Page not found', {
            status: 404,
          });
        }

        if (isPagePropsRedirect(props)) {
          return new Response(null, {
            status: props.redirect.permanent ? 301 : 302,
            headers: { Location: props.redirect.destination },
          });
        }

        const page = await renderPage(
          match,
          documentPath,
          appPath,
          props,
          version
        );

        return new Response(page, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }
      let reqPath = new URL(request.url).pathname;

      if (reqPath.startsWith('/.autobun')) {
        const buildResponse = await serveFromDir({
          directory: PROJECT_ROOT,
          path: reqPath,
          request,
        });
        if (buildResponse) return buildResponse;
      }

      const publicResponse = await serveFromDir({
        directory: PUBLIC_DIR,
        path: reqPath,
        request,
      });
      if (publicResponse) return publicResponse;

      return new Response('File not found', {
        status: 404,
      });
    },
  } satisfies ServeOptions;
};
