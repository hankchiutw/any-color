import {
  FakeBrowser,
  Snackbar,
  SnackbarContext,
  GithubCorner,
} from 'components';
import React, { useRef } from 'react';
import styles from '../styles/index.styles';

export default function Home() {
  const snackbarRef = useRef<Snackbar>(null);

  return (
    <>
      <style jsx>{styles}</style>
      <GithubCorner></GithubCorner>

      <SnackbarContext.Provider value={snackbarRef}>
        <div className="container">
          <header>
            <img src="/header.png" />
          </header>
          <div className="fake-browser">
            <FakeBrowser></FakeBrowser>
          </div>
          <a
            className="crxAnchor"
            href="https://chrome.google.com/webstore/detail/any-color/cmehpadapglhhambdiafddpfjdngonba"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Chrome extension
          </a>
          <div className="footer">
            ©&nbsp;
            <a
              href="https://hankchiu.tw"
              target="_blank"
              rel="noopener noreferrer"
            >
              hankchiu.tw
            </a>
            &nbsp;2020
          </div>
        </div>
        <Snackbar ref={snackbarRef}></Snackbar>
      </SnackbarContext.Provider>
    </>
  );
}
