import { type AppComponentProps } from 'autobun';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppComponentProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
