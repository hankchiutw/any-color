import { injectable } from 'inversify';
import { Inspector } from './core/inspector';
import { Project } from './core/project';
import { container, MessageService, CapturedTab } from '~/common';
import 'reflect-metadata';

@injectable()
class ContentMain {
  private inspectorActive = false;

  constructor(
    private messageService: MessageService,
    private project: Project,
    private inspector: Inspector
  ) {
    this.initInspector();
    this.handleViewportChange();
    this.handleMessage();
  }

  private initInspector() {
    this.project.attachInspector(this.inspector);
    this.project.hide();
  }

  private handleMessage() {
    this.messageService.on('inspectorChange', this.updateInspector);
    this.messageService.on('captured', this.updateImage);
  }

  private updateInspector = (active: boolean) => {
    this.inspectorActive = active;
    active ? this.project.show() : this.project.hide();
  };

  /**
   * Keep capturing current tab image when viewport changed.
   */
  private handleViewportChange() {
    let timerId: number;
    const debounceSend = () => {
      if (!this.inspectorActive) {
        return;
      }
      window.clearTimeout(timerId);
      this.project.hide();
      timerId = window.setTimeout(() => {
        this.messageService.send('requestCapture');
      }, 200);
    };
    window.addEventListener('scroll', debounceSend);
    window.addEventListener('resize', debounceSend);
  }

  /**
   * Sync inspector's image with captured tab.
   */
  private updateImage = (detail: CapturedTab) => {
    const { imgSrc, width, height } = detail;
    this.project.setSize(width, height);

    const img = new Image(width, height);
    img.src = imgSrc;
    this.inspector.loadImage(img);
    this.project.show();
  };
}

container.bind<Project>(Project).toSelf();
container.bind<Inspector>(Inspector).toSelf();
container.bind<ContentMain>(ContentMain).toSelf();
container.resolve(ContentMain);
