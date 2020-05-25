import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class Notification {
  private dom: HTMLElement;

  constructor() {
    this.dom = document.createElement('div');
    this.dom.setAttribute(
      'style',
      `
      position: absolute;
      top: 10px;
      right: 10px;
      background: white;
      border: solid 1px #cccccc;
      padding: 10px;
      border-radius: 4px;
      display: none;
      `
    );
    document.body.appendChild(this.dom);
  }

  public pop(message: string) {
    this.dom.innerHTML = message;
    this.dom.style.display = 'inherit';
    window.setTimeout(() => {
      this.dom.style.display = 'none';
    }, 2000);
  }
}
