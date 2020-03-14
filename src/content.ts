import { EventPayload } from './models';
import { Project } from './project';
import { RasterInspector } from './raster-inspector';

let project: Project;
let inspector: RasterInspector;

chrome.runtime.onMessage.addListener(({ eventName, detail }: EventPayload) => {
  switch (eventName) {
    case 'init':
      project = Project.create();
      inspector = RasterInspector.create();
      project.attachInspector(inspector);
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
