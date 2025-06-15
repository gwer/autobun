import { hydrate } from 'preact';
const { default: App } = await import(globalThis.__AUTOBUN_DATA.pathToApp);
const { default: Page } = await import(globalThis.__AUTOBUN_DATA.pathToPage);
const { pageProps, appProps } = globalThis.__AUTOBUN_DATA;
hydrate(
  <App appProps={appProps} Component={Page} pageProps={pageProps} />,
  document.getElementById('__AUTOBUN_APP')
);
