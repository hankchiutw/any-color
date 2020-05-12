import { injectable } from 'inversify';
import { toPromise } from './utils';
import 'reflect-metadata';

interface EventPayload {
  eventName: string;
  detail?: EventDetail;
}

export type EventDetail = {};

@injectable()
export class MessageService {
  public async sendTab(eventName: string, detail = {}) {
    const tabs = await toPromise<chrome.tabs.Tab[]>(chrome.tabs.query)({
      active: true,
      currentWindow: true,
    });

    chrome.tabs.sendMessage(tabs[0].id, {
      eventName,
      detail,
    } as EventPayload);
  }

  public async send(eventName: string, detail = {}) {
    chrome.runtime.sendMessage({
      eventName,
      detail,
    } as EventPayload);
  }

  public on(eventName: string, callback: (detail: EventDetail) => void) {
    chrome.runtime.onMessage.addListener((payload: EventPayload) => {
      if (payload.eventName === eventName) {
        callback(payload.detail);
      }
    });
  }
}
