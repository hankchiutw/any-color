import { Inspector } from './inspector';
import { EventPayload } from './models';
import { Project } from './project';

let project: Project;
let inspector: Inspector;

function handleViewportChange() {
  let timerId: number;
  const debounceSend = () => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      chrome.runtime.sendMessage({
        eventName: 'requestCapture',
      });
    }, 200);
  };
  window.addEventListener('scroll', debounceSend);
  window.addEventListener('resize', debounceSend);
}

chrome.runtime.onMessage.addListener(({ eventName, detail }: EventPayload) => {
  switch (eventName) {
    case 'init':
      project = Project.create();
      inspector = Inspector.create();
      project.attachInspector(inspector);
      handleViewportChange();
      break;
    case 'captureVisibleTab':
      {
        const { imgSrc, width, height } = detail;
        project.setSize(width, height);

        const img = new Image(width, height);
        img.src = imgSrc;
        inspector.loadImage(img);
      }
      break;
  }
});
