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
  /**
   * Send message to a {@link chrome.tabs.Tab}.
   */
  public async sendTab(eventName: string, detail = {}): Promise<void> {
    const tabs = await toPromise<chrome.tabs.Tab[]>(chrome.tabs.query)({
      active: true,
      currentWindow: true,
    });

    return toPromise<void>(chrome.tabs.sendMessage)(tabs[0].id, {
      eventName,
      detail,
    } as EventPayload);
  }

  /**
   * Send message to runtime (background script).
   */
  public async send(eventName: string, detail = {}): Promise<void> {
    return toPromise<void>(chrome.runtime.sendMessage)({
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
