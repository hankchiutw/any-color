import { injectable } from 'inversify';
import { PaperProject, Project, paperProject, Inspector } from './core';
import { container, MessageService, CapturedTab } from '~/common';
import 'reflect-metadata';

interface DropperState {
  active: boolean;
}

@injectable()
class ContentMain {
  private dropperState: DropperState = {
    active: false,
  };

  constructor(
    private messageService: MessageService,
    private project: Project,
    private inspector: Inspector
  ) {
    this.handleViewportChange();
    this.handleMessage();
  }

  private handleMessage() {
    this.messageService.on('captured', this.updateImage);
    this.messageService.on('toggleInspector', this.toggleInspector);
    // TODO: enhance MessageService with response callback
    this.messageService.on('requestDropperState', () => {
      this.messageService.send('updateDropperState', this.dropperState);
    });
  }

  /**
   * Keep capturing current tab image when viewport changed.
   */
  private handleViewportChange() {
    let timerId: number;
    const debounceSend = () => {
      if (!this.dropperState.active) {
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
    this.dropperState.active = true;
  };

  private toggleInspector = () => {
    this.project.visible ? this.project.hide() : this.project.show();
    this.dropperState.active = !this.project.visible;
    this.messageService.send('updateDropperState', this.dropperState);
  };
}

container.bind<PaperProject>(PaperProject).toConstantValue(paperProject);
container.bind<Project>(Project).toSelf();
container.bind<Inspector>(Inspector).toSelf();
container.bind<ContentMain>(ContentMain).toSelf();
container.resolve(ContentMain);
