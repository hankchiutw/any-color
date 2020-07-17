import { FakeBrowser, Snackbar, SnackbarContext } from 'components';
import React, { useRef } from 'react';
import styles from '../styles/index.styles';

export default function Home() {
  const snackbarRef = useRef<Snackbar>(null);

  return (
    <>
      <style jsx>{styles}</style>

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
            &nbsp;2020.
            <a
              data-icon="github"
              href="https://github.com/hankchiutw"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
            <a
              data-icon="linkedin"
              href="https://www.linkedin.com/in/hankchiutw"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
            <a
              data-icon="stackoverflow"
              href="https://stackoverflow.com/users/6040102/hank-chiu"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </div>
        </div>
        <Snackbar ref={snackbarRef}></Snackbar>
      </SnackbarContext.Provider>
    </>
  );
}
