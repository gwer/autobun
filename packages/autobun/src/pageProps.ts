import { MatchedRoute } from 'bun';
import {
  PageGetServerSideProps,
  AppGetServerSideProps,
  PageSpecialProps,
  isPagePropsNotFound,
  isPagePropsRedirect,
} from './types';

const defaultAppGetServerSideProps: AppGetServerSideProps = async (
  ctx,
  pageProps
) => {
  return {
    pageProps,
    appProps: {},
    documentProps: {
      title: pageProps.title || 'Autobun',
    },
  };
};
const defaultPageGetServerSideProps: PageGetServerSideProps = () => ({});

async function loadModuleGSSP<T>(
  modulePath: string,
  version: number,
  buildDefaultGetProps: (staticProps?: any) => T
): Promise<T> {
  const ComponentModule = await import(modulePath + `?v=${version}`);
  const staticProps = ComponentModule.props;
  let getServerSideProps: T | null = null;
  try {
    const propsPath = modulePath.replace('.js', '.props.js');

    if (await Bun.file(propsPath).exists()) {
      getServerSideProps = (await import(propsPath + `?v=${version}`)).default;
    }
  } catch (_) {}

  return getServerSideProps || buildDefaultGetProps(staticProps);
}

const loadPageGSSP = async (
  modulePath: string,
  version: number
): Promise<PageGetServerSideProps> => {
  const buildDefaultGetProps = (staticProps?: any) => {
    if (staticProps) {
      return () => staticProps;
    }

    return defaultPageGetServerSideProps;
  };

  return loadModuleGSSP(modulePath, version, buildDefaultGetProps);
};

const loadAppGSSP = async (
  modulePath: string,
  version: number
): Promise<AppGetServerSideProps> => {
  const buildDefaultGetProps = () => {
    return defaultAppGetServerSideProps;
  };

  return loadModuleGSSP(modulePath, version, buildDefaultGetProps);
};

export type AllProps = {
  pageProps: any;
  appProps: any;
  documentProps: any;
};

export const getAllProps = async (
  matchRoute: MatchedRoute,
  appPath: string,
  version: number,
  request: Request
): Promise<AllProps | PageSpecialProps> => {
  const gsspCtx = {
    route: matchRoute,
    request,
  };
  const getAppProps = await loadAppGSSP(appPath, version);
  const getPageProps = await loadPageGSSP(matchRoute.filePath, version);

  const rawPageProps = await getPageProps(gsspCtx);

  if (isPagePropsNotFound(rawPageProps)) {
    return { notFound: true };
  }

  if (isPagePropsRedirect(rawPageProps)) {
    return { redirect: rawPageProps.redirect };
  }

  return getAppProps(gsspCtx, rawPageProps);
};
