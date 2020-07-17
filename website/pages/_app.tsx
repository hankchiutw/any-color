import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../styles.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AnyColor</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
