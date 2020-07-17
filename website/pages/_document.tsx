import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" type="image/png" href="/favicon.png" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-172921793-1"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (window.location.hostname === 'localhost') {
                  window['ga-disable-UA-172921793-1'] = true;
                }
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'UA-172921793-1');
              `,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (window.location.hostname !== 'localhost') {
                  (function(h,o,t,j,a,r){
                      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                      h._hjSettings={hjid:1905648,hjsv:6};
                      a=o.getElementsByTagName('head')[0];
                      r=o.createElement('script');r.async=1;
                      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                      a.appendChild(r);
                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                }
              `,
            }}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
