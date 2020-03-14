import { toPromise } from '../utils';
import { MessageService } from './message-service';

chrome.runtime.onInstalled.addListener(() => {
  console.log('AnyColor installed.');
});

chrome.browserAction.onClicked.addListener(async (tab: chrome.tabs.Tab) => {
  const messageService = MessageService.create(tab.id);

  messageService.send('init');

  const imgSrc = await toPromise<string>(chrome.tabs.captureVisibleTab)(null, {
    format: 'png',
  });
  const zoom: number = await toPromise<number>(chrome.tabs.getZoom)();
  console.log('got imgSrc, zoom:', imgSrc, zoom);

  messageService.send('captureVisibleTab', {
    imgSrc,
    width: tab.width / zoom,
    height: tab.height / zoom,
  });
});
