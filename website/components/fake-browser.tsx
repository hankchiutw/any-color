import React from 'react';
import styles from './fake-browser.styles';

export default function FakeBrowser() {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="host">
        <div className="head">
          <div className="button button--red"></div>
          <div className="button button--yellow"></div>
          <div className="button button--green"></div>
          <div className="search-bar">Pick any pixel color from a web page</div>
        </div>
        <div className="content"></div>
      </div>
    </>
  );
}
