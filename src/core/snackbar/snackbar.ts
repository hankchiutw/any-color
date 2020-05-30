import { injectable } from 'inversify';
import 'reflect-metadata';
import './ui-snackbar';
import './ui-color-spot';

@injectable()
export class Snackbar {
  private dom;

  constructor() {
    this.dom = document.createElement('ui-snackbar');
    document.body.prepend(this.dom);
  }

  public notifyCopy(hex: string) {
    const html = `
    <ui-color-spot color='${hex}'></ui-color-spot>
    <div>
    ${hex} copied!
    </div>
    `;
    this.dom.popHtml(html);
  }
}
