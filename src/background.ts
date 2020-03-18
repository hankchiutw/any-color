import { MessageService } from './core/message-service';
import { toPromise } from './core/utils';

chrome.runtime.onInstalled.addListener(() => {
  console.log('AnyColor installed.');
});

async function captureVisibleTab(tabId: number) {
  const messageService = MessageService.create(tabId);
  const latestTab = await toPromise<chrome.tabs.Tab>(chrome.tabs.get)(tabId);
  const zoom: number = await toPromise<number>(chrome.tabs.getZoom)();
  const width = latestTab.width / zoom;
  const height = latestTab.height / zoom;

  const imgSrc = await toPromise<string>(chrome.tabs.captureVisibleTab)(null, {
    format: 'png',
  });

  console.log(
    'captureVisibleTab: src length, width, height:',
    imgSrc.length,
    width,
    height
  );
  messageService.send('captureVisibleTab', {
    imgSrc,
    width,
    height,
  });
}

chrome.browserAction.onClicked.addListener(async (tab: chrome.tabs.Tab) => {
  const messageService = MessageService.create(tab.id);

  messageService.send('init');

  captureVisibleTab(tab.id);

  messageService.on('requestCapture', () => {
    captureVisibleTab(tab.id);
  });
});
