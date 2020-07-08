import { Inspector, inspectorFactory } from 'colorins';
import React, { useCallback } from 'react';
import styles from './fake-browser.styles';

export default function FakeBrowser() {
  const initInspector = useCallback((canvasEl) => {
    if (canvasEl) {
      const { width, height } = window.getComputedStyle(canvasEl);
      const w = parseFloat(width);
      const h = parseFloat(height);
      const inspector: Inspector = inspectorFactory(canvasEl);
      const img = new Image(w, h);
      img.src = '/page.png';
      inspector.loadImage(img);
    }
  }, []);
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
        <div className="content">
          <img src="/page.png"></img>
          <canvas ref={initInspector}></canvas>
        </div>
      </div>
    </>
  );
}
