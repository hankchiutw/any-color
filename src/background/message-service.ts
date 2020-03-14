import { EventPayload } from '../models';

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
}
