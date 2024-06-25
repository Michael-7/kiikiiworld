import '../css/reset.scss';
import '../css/globals.scss';
import '../css/components.scss';

export default function App({ Component, pageProps }: { Component: any, pageProps: any}) {
  return <Component {...pageProps} />;
}