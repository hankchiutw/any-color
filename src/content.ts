import { EventPayload } from './models';
import { PixelImage } from './pixel-image';

chrome.runtime.onMessage.addListener(({ eventName, detail }: EventPayload) => {
  if (eventName === 'captureVisibleTab') {
    const { imgSrc, width, height } = detail;
    const pixelImage = PixelImage.create({
      width,
      height,
      src: imgSrc,
    });

    window.addEventListener('click', ({ clientX, clientY }) => {
      console.log(
        'xxx: clicked:',
        clientX,
        clientY,
        pixelImage.rgbAt(clientX, clientY)
      );
    });
  }
});
