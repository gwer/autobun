import { type PageGetServerSideProps, type PageSpecialProps } from 'autobun';

const IDS_MAP: Record<string, PageSpecialProps> = {
  'permanent-redirect': {
    redirect: {
      destination: '/',
      permanent: true,
    },
  },
  'temporary-redirect': {
    redirect: {
      destination: '/',
      permanent: false,
    },
  },
  'not-found': {
    notFound: true,
  },
};

const getServerSideProps: PageGetServerSideProps = async ({ route }) => {
  const id = route.params.id;

  return IDS_MAP[id] ?? { notFound: true };
};

export default getServerSideProps;
