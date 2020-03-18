import { EventPayload, EventDetail } from './models';

export class MessageService {
  public static create(tabId: number) {
    return new MessageService(tabId);
  }

  constructor(private tabId: number) {}

  public send(eventName: string, detail = {}) {
    chrome.tabs.sendMessage(this.tabId, {
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
