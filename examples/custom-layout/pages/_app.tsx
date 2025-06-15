import { ComponentChildren } from 'preact';
import { AppComponentProps } from 'autobun';
import DefaultLayout from '../components/DefaultLayout';

const getDefaultLayout = (page: ComponentChildren) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default function App({ Component, pageProps }: AppComponentProps) {
  const getLayout = Component.getLayout || getDefaultLayout;

  return getLayout(<Component {...pageProps} />);
}
