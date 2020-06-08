import { injectable } from 'inversify';
import { container, MessageService, toPromise, CapturedTab } from '~/common';
import 'regenerator-runtime/runtime';
import 'reflect-metadata';

@injectable()
class BackgroundMain {
  constructor(private messageService: MessageService) {
    chrome.runtime.onInstalled.addListener(() => {
      console.log('AnyColor installed.');
    });

    chrome.browserAction.onClicked.addListener(({ id: tabId }) => {
      chrome.tabs.executeScript(tabId, {
        file: 'content.js',
      });
    });

    this.messageService.on('requestCapture', this.captureVisibleTab);
    this.handleCommands();
  }

  private captureVisibleTab = async (): Promise<CapturedTab> => {
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

    const capturedTab = {
      imgSrc,
      width,
      height,
    };
    console.log('captureVisibleTab:', capturedTab);
    this.messageService.sendTab('captured', capturedTab);
    return capturedTab;
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
