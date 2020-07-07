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

      <div className="container">
        <header>
          <img src="/header.png" />
        </header>
        <div className="fake-browser">
          <FakeBrowser></FakeBrowser>
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        header {
          text-align: center;
        }

        .fake-browser {
          flex: 1;
          padding: 0 10% 10%;
        }
      `}</style>
    </>
  );
}
