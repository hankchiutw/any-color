import { injectable } from 'inversify';
import 'reflect-metadata';
import './snackbar.ui';

@injectable()
export class Snackbar {
  private dom;

  constructor() {
    this.dom = document.createElement('ui-snackbar');
    document.body.appendChild(this.dom);
  }

  public pop(message: string) {
    this.dom.pop(message);
  }
}
