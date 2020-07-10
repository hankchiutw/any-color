import FakeBrowser from 'components/fake-browser';
import Head from 'next/head';
import React from 'react';
import styles from './index.styles';

export default function Home() {
  return (
    <>
      <style jsx>{styles}</style>
      <Head>
        <title>AnyColor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <header>
          <img src="/header.png" />
        </header>
        <div className="fake-browser">
          <FakeBrowser></FakeBrowser>
        </div>
      </div>
    </>
  );
}
