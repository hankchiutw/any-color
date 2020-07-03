import FakeBrowser from 'components/fake-browser';
import Head from 'next/head';
import React from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>AnyColor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <img src="/header.png" />
      </header>
      <FakeBrowser></FakeBrowser>

      <style jsx>{`
        header {
          text-align: center;
        }
      `}</style>
    </>
  );
}
