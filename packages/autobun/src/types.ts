import { MatchedRoute } from 'bun';
import { FunctionComponent, VNode } from 'preact';

export type GetServerSidePropsCtx = {
  route: MatchedRoute;
  request: Request;
};

/** Page */

export type PageProps = Record<string, any>;

export type PagePropsNotFound = { notFound: boolean };
export type PagePropsRedirect = {
  redirect: { destination: string; permanent: boolean };
};

export const isPagePropsNotFound = (
  props: unknown
): props is PagePropsNotFound => {
  return !!props && typeof props === 'object' && 'notFound' in props;
};

export const isPagePropsRedirect = (
  props: unknown
): props is PagePropsRedirect => {
  return !!props && typeof props === 'object' && 'redirect' in props;
};

export type PageSpecialProps = PagePropsNotFound | PagePropsRedirect;

export type PageGetServerSideProps<P = PageProps> = (
  ctx: GetServerSidePropsCtx
) => Promise<P | PageSpecialProps> | P | PageSpecialProps;

/** Document */

export type DocumentCtx = {
  styles: VNode;
  hydrationScripts: VNode;
};

export type DocumentProps = {
  title: string;
};

export type DocumentFullProps<D = DocumentProps> = D & { ctx: DocumentCtx };

/** App */

export type AppProps = Record<string, any>;

export type AppComponentProps<P = PageProps, A = AppProps> = {
  Component: FunctionComponent;
  pageProps: P;
  appProps: A;
};

export type AppGetServerSidePropsResult<
  P = PageProps,
  A = AppProps,
  D = DocumentProps
> = {
  pageProps: P;
  appProps: A;
  documentProps: D;
};

export type AppGetServerSideProps<
  P = PageProps,
  A = AppProps,
  D = DocumentProps
> = (
  ctx: GetServerSidePropsCtx,
  pageProps: P
) =>
  | Promise<AppGetServerSidePropsResult<P, A, D>>
  | AppGetServerSidePropsResult<P, A, D>;
