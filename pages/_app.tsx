import '@/styles/base.scss';
import Head from 'next/head';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cache-control" content="public" />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default App;
