import { type AppGetServerSideProps } from 'autobun';

const getServerSideProps: AppGetServerSideProps = async (ctx, pageProps) => {
  return {
    pageProps,
    appProps: {},
    documentProps: {
      title: pageProps.title || 'Sample App',
    },
  };
};

export default getServerSideProps;
