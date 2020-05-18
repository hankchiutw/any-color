import { injectable } from 'inversify';
import { container, MessageService, toPromise, CapturedTab } from '~/common';
import 'reflect-metadata';

@injectable()
class BackgroundMain {
  constructor(private messageService: MessageService) {
    chrome.runtime.onInstalled.addListener(() => {
      console.log('AnyColor installed.');
    });

    this.messageService.on('requestCapture', this.captureVisibleTab);
    this.handleCommands();
  }

  private captureVisibleTab = async () => {
    const tabs = await toPromise<chrome.tabs.Tab[]>(chrome.tabs.query)({
      active: true,
      currentWindow: true,
    });
    const latestTab = tabs[0];
    const zoom: number = await toPromise<number>(chrome.tabs.getZoom)();
    const width = latestTab.width / zoom;
    const height = latestTab.height / zoom;

    const imgSrc = await toPromise<string>(chrome.tabs.captureVisibleTab)(
      null,
      {
        format: 'png',
      }
    );

    console.log(
      'captureVisibleTab: src length, width, height:',
      imgSrc.length,
      width,
      height
    );
    this.messageService.sendTab('captured', {
      imgSrc,
      width,
      height,
    } as CapturedTab);
  };

  private handleCommands() {
    chrome.commands.onCommand.addListener((command: string) => {
      if (command === 'toggle-inspector') {
        this.messageService.sendTab('toggleInspector');
      }
    });
  }
}

container.bind<BackgroundMain>(BackgroundMain).toSelf();
container.resolve(BackgroundMain);
