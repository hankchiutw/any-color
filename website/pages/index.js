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

      <style jsx>{`
        header {
          text-align: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        #__next {
          width: 100%;
          height: 100%;
          background: url(/bg.png) no-repeat;
          background-size: cover;
        }
      `}</style>
    </>
  );
}
