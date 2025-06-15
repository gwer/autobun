import { MatchedRoute } from 'bun';
import { render } from 'preact-render-to-string';
import { FunctionComponent } from 'preact';
import { AppComponentProps } from './types';
import { AllProps } from './pageProps';

const STATIC_DIR = '.autobun/static';

const toStaticUrl = (path: string): string => `/${path}`;

async function loadModuleComponent<F = FunctionComponent>(
  modulePath: string,
  version: number
): Promise<F> {
  return (await import(modulePath + `?v=${version}`)).default;
}

const isStaticFileExists = async (fullPath: string): Promise<boolean> => {
  try {
    return await Bun.file(fullPath).exists();
  } catch {
    return false;
  }
};

export const renderPage = async (
  matchRoute: MatchedRoute,
  documentPath: string,
  appPath: string,
  props: AllProps,
  version: number
): Promise<string> => {
  const Document = await loadModuleComponent(documentPath, version);
  const AppComponent = await loadModuleComponent<
    FunctionComponent<AppComponentProps>
  >(appPath, version);
  const Component = await loadModuleComponent(matchRoute.filePath, version);

  const { pageProps, appProps, documentProps } = props;

  const pagePath = `${STATIC_DIR}/pages/${matchRoute.src}`;
  const pageCssPath = `${STATIC_DIR}/pages/${matchRoute.src.replace(
    '.js',
    '.css'
  )}`;
  const appStaticPath = `${STATIC_DIR}/pages/_app.js`;
  const appCssPath = `${STATIC_DIR}/pages/_app.css`;
  const hydratePath = `${STATIC_DIR}/hydrate.js`;

  const ssrData = {
    pathToApp: toStaticUrl(appStaticPath),
    pathToPage: toStaticUrl(pagePath),
    params: matchRoute.params,
    pageProps,
    appProps,
  };

  const [isAppCssExists, isPageCssExists] = await Promise.all([
    isStaticFileExists(appCssPath),
    isStaticFileExists(pageCssPath),
  ]);

  const styles = (
    <>
      {isAppCssExists && (
        <link rel="stylesheet" href={toStaticUrl(appCssPath)} />
      )}
      {isPageCssExists && (
        <link rel="stylesheet" href={toStaticUrl(pageCssPath)} />
      )}
    </>
  );
  const hydrationScripts = (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `globalThis.__AUTOBUN_DATA = ${JSON.stringify(ssrData)};`,
        }}
      />
      <script type="module" defer src={toStaticUrl(hydratePath)} />
    </>
  );
  const ctx = {
    styles,
    hydrationScripts,
  };
  const page = await render(
    <Document ctx={ctx} {...documentProps}>
      <div id="__AUTOBUN_APP">
        <AppComponent
          appProps={appProps}
          Component={Component}
          pageProps={pageProps}
        />
      </div>
    </Document>
  );

  return '<!DOCTYPE html>\n' + page;
};
