import { AppComponentProps } from 'autobun';

export default function App({ Component, pageProps }: AppComponentProps) {
  return <Component {...pageProps} />;
}
