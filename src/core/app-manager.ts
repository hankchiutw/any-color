import { injectable } from 'inversify';
import paper from 'paper';
import { Inspector } from './inspector';
import { PaperProject } from './paper-project';
import { MessageService, CapturedTab } from '~/common';
import { App } from '~/elements';
import 'reflect-metadata';

@injectable()
export class AppManager {
  private view: paper.View;

  constructor(
    private app: App,
    private project: PaperProject,
    private inspector: Inspector,
    private messageService: MessageService
  ) {
    this.view = this.project.view;
    this.app.hide();
    this.handleViewportChange();
    this.handleMessage();
  }

  private setSize(width: number, height: number) {
    this.view.viewSize = new paper.Size(width, height);
  }

  private show() {
    this.app.show();
    this.view.requestUpdate();
  }

  private handleMessage() {
    this.messageService.on('toggleInspector', this.toggleInspector);
  }

  /**
   * Keep capturing current tab image when viewport changed.
   */
  private handleViewportChange() {
    let timerId: number;
    const debounceSend = () => {
      if (!this.app.visible) {
        return;
      }
      window.clearTimeout(timerId);
      this.app.hide();
      timerId = window.setTimeout(() => {
        this.requestCapture();
      }, 200);
    };
    window.addEventListener('scroll', debounceSend);
    window.addEventListener('resize', debounceSend);
  }

  private async requestCapture() {
    const detail = await this.messageService.send<CapturedTab>(
      'requestCapture'
    );
    this.updateImage(detail);
  }

  /**
   * Sync inspector's image with captured tab.
   */
  private updateImage = (detail: CapturedTab) => {
    const { imgSrc, width, height } = detail;
    this.setSize(width, height);

    const img = new Image(width, height);
    img.src = imgSrc;
    this.inspector.loadImage(img);
    this.show();
  };

  private toggleInspector = () => {
    const nextValue = !this.app.visible;
    if (nextValue) {
      this.requestCapture();
      this.show();
    } else {
      this.app.hide();
    }
    return nextValue;
  };
}
