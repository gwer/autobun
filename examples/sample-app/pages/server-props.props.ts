import { type PageGetServerSideProps } from 'autobun';
import packageJson from '../package.json';

const getServerSideProps: PageGetServerSideProps = async () => {
  return {
    title: 'With Server Props',
    appName: packageJson.name,
  };
};

export default getServerSideProps;
