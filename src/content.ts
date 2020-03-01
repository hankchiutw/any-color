import { EventPayload } from './models';

function getImageData(img: HTMLImageElement) {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  // XXX: debug
  document.body.insertAdjacentElement('afterbegin', canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('null ctx');
  }
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const imgData = ctx.getImageData(0, 0, img.width, img.height).data;
  console.log('xxx: imgData:', imgData);
}

chrome.runtime.onMessage.addListener(({ eventName, detail }: EventPayload) => {
  if (eventName === 'captureVisibleTab') {
    const { imgSrc, width, height } = detail;
    const img = new Image(width, height);
    img.src = imgSrc;
    img.addEventListener('load', () => {
      getImageData(img);
    });
  }
});
