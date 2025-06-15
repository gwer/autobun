import path from 'path';
import fs from 'fs';
import * as esbuild from 'esbuild';
import CssModulesPlugin from 'esbuild-css-modules-plugin';

const PROJECT_ROOT = process.cwd();
const AUTOBUN_DIR = path.resolve(PROJECT_ROOT, '.autobun');
const BUILD_DIR = path.resolve(AUTOBUN_DIR, 'static');
const SERVER_BUILD_DIR = path.resolve(AUTOBUN_DIR, 'server');
const PAGES_DIR = path.resolve(PROJECT_ROOT, 'pages');

const srcRouter = new Bun.FileSystemRouter({
  dir: PAGES_DIR,
  style: 'nextjs',
});

function createBuildDirs() {
  try {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
    fs.mkdirSync(SERVER_BUILD_DIR, { recursive: true });
  } catch (error) {
    console.error('Failed to create build directories:', error);
    throw error;
  }
}

function createBuildConfigs(): {
  clientConfig: esbuild.BuildOptions;
  serverConfig: esbuild.BuildOptions;
} {
  const pagesEntryPoints = Object.entries(srcRouter.routes).map(
    ([key, value]) => ({
      in: value,
      out: value
        .replace(`${PROJECT_ROOT}/`, '')
        .replace(/\.(tsx|jsx|ts|js)$/, ''),
    })
  );

  const filterClientEntryPoints = (
    entryPoints: { in: string; out: string }[]
  ) => entryPoints.filter((entry) => !entry.out.endsWith('.props'));

  const hydrateEntryPoints = [
    {
      in: path.resolve(import.meta.dir, 'hydrate.tsx'),
      out: 'hydrate',
    },
  ];

  const clientEntryPoints = [
    ...filterClientEntryPoints(pagesEntryPoints),
    ...hydrateEntryPoints,
  ];

  const serverEntryPoints = pagesEntryPoints;

  const commonConfig: esbuild.BuildOptions = {
    bundle: true,
    format: 'esm',
    sourcemap: true,
    absWorkingDir: PROJECT_ROOT,
    minify: true,
    plugins: [
      CssModulesPlugin({
        // [local] must be at the end for grid support
        pattern: '[name]-[hash]-[local]',
        localsConvention: 'pascalCase',
      }),
    ],
  };

  return {
    clientConfig: {
      ...commonConfig,
      entryPoints: clientEntryPoints,
      outdir: BUILD_DIR,
      platform: 'browser' as const,
      splitting: true,
    },
    serverConfig: {
      ...commonConfig,
      entryPoints: serverEntryPoints,
      outdir: SERVER_BUILD_DIR,
      platform: 'node' as const,
      packages: 'external' as const,
    },
  };
}

export async function build() {
  createBuildDirs();
  const { clientConfig, serverConfig } = createBuildConfigs();
  await esbuild.build(clientConfig);
  await esbuild.build(serverConfig);
}

export async function watch() {
  createBuildDirs();
  const { clientConfig, serverConfig } = createBuildConfigs();
  const clientBuild = await esbuild.context(clientConfig);
  const serverBuild = await esbuild.context(serverConfig);
  await clientBuild.rebuild();
  await serverBuild.rebuild();
  await clientBuild.watch();
  await serverBuild.watch();
}
