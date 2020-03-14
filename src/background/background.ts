import { EventPayload } from '../models';
import { toPromise } from '../utils';

chrome.runtime.onInstalled.addListener(() => {
  console.log('AnyColor installed.');
});

chrome.browserAction.onClicked.addListener(async (tab: chrome.tabs.Tab) => {
  const imgSrc = await toPromise<string>(chrome.tabs.captureVisibleTab)(null, {
    format: 'png',
  });
  const zoom: number = await toPromise<number>(chrome.tabs.getZoom)();
  console.log('got imgSrc, zoom:', imgSrc, zoom);


  chrome.tabs.sendMessage(tab.id, {
    eventName: 'captureVisibleTab',
    detail: {
      imgSrc,
      width: tab.width / zoom,
      height: tab.height / zoom,
    },
  } as EventPayload);
});
