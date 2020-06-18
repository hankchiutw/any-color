import { injectable } from 'inversify';
import { toPromise } from '~/common';
import 'reflect-metadata';

@injectable()
export class ContentInjector {
  public async inject(tabId: number): Promise<void> {
    const isInjected = await this.isInjected(tabId);
    if (isInjected) {
      return;
    }

    return toPromise<void>(chrome.tabs.executeScript)(tabId, {
      file: 'content.js',
    });
  }

  public async getActiveTabId(): Promise<number> {
    const tabs = await toPromise<chrome.tabs.Tab[]>(chrome.tabs.query)({
      active: true,
      currentWindow: true,
    });
    return tabs[0].id;
  }

  /**
   * @remarks
   * TODO: define a more reasonable custom element.
   */
  private async isInjected(tabId: number): Promise<boolean> {
    const result = await toPromise<boolean>(chrome.tabs.executeScript)(tabId, {
      code: 'document.querySelector("ui-snackbar")',
    });
    return result[0];
  }
}
