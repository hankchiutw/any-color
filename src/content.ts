import { injectable, inject } from 'inversify';
import 'regenerator-runtime/runtime';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import {
  PaperProject,
  Project,
  paperProject,
  Inspector,
  Snackbar,
  store,
  Store,
  APP_STORE,
  AppState,
} from './core';
import { container, MessageService, CapturedTab } from '~/common';
import 'reflect-metadata';

@injectable()
class ContentMain {
  constructor(
    private messageService: MessageService,
    private project: Project,
    private inspector: Inspector,
    @inject(APP_STORE) private store: Store
  ) {
    this.handleViewportChange();
    this.handleMessage();
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
      this.project.hide();
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
    this.project.setSize(width, height);

    const img = new Image(width, height);
    img.src = imgSrc;
    this.inspector.loadImage(img);
    this.project.show();
    this.store.dispatch({ type: 'SET_ACTIVE', value: true });
  };

  private toggleInspector = () => {
    const nextValue = !this.project.visible;
    if (nextValue) {
      this.requestCapture();
      this.project.show();
    } else {
      this.project.hide();
    }
    this.store.dispatch({ type: 'SET_ACTIVE', value: nextValue });
    return nextValue;
  };
}

container.bind<PaperProject>(PaperProject).toConstantValue(paperProject);
container.bind<Store>(APP_STORE).toConstantValue(store);
container.bind<Project>(Project).toSelf();
container.bind<Inspector>(Inspector).toSelf();
container.bind<Snackbar>(Snackbar).toSelf();
container.bind<ContentMain>(ContentMain).toSelf();
container.resolve(ContentMain);
