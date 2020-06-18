import { injectable, inject } from 'inversify';
import paper from 'paper';
import { Inspector } from './inspector';
import { PaperProject } from './paper-project';
import { Store, AppState, APP_STORE } from './store';
import { MessageService, CapturedTab } from '~/common';
import 'reflect-metadata';

@injectable()
export class Project {
  private view: paper.View;

  constructor(
    private project: PaperProject,
    private messageService: MessageService,
    private inspector: Inspector,
    @inject(APP_STORE) private store: Store
  ) {
    this.view = this.project.view;
    this.hide();
    this.handleViewportChange();
    this.handleMessage();
  }

  private get visible() {
    return this.view.element.style.visibility !== 'hidden';
  }

  private setSize(width: number, height: number) {
    this.view.viewSize = new paper.Size(width, height);
  }

  private hide() {
    this.view.element.style.visibility = 'hidden';
    this.view.element.style.cursor = `inherit`;
  }

  private show() {
    this.view.element.style.visibility = 'inherit';
    this.view.element.style.cursor = `none`;
    this.view.requestUpdate();
  }

  private handleMessage() {
    this.messageService.on('toggleInspector', this.toggleInspector);
    // TODO: enhance MessageService with response callback
    this.messageService.on<AppState>('requestDropperState', () =>
      this.store.getState()
    );
  }

  /**
   * Keep capturing current tab image when viewport changed.
   */
  private handleViewportChange() {
    let timerId: number;
    const debounceSend = () => {
      if (!this.store.getState().active) {
        return;
      }
      window.clearTimeout(timerId);
      this.hide();
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
    this.store.dispatch({ type: 'SET_ACTIVE', value: true });
  };

  private toggleInspector = () => {
    const nextValue = !this.visible;
    if (nextValue) {
      this.requestCapture();
      this.show();
    } else {
      this.hide();
    }
    this.store.dispatch({ type: 'SET_ACTIVE', value: nextValue });
    return nextValue;
  };
}
