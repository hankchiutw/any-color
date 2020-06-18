import {
  LitElement,
  html,
  customElement,
  internalProperty,
  css,
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

const DURATION = 2000;

export const snackbarFactory = (wrapper: HTMLElement) => {
  const dom = document.createElement('ac-snackbar');
  wrapper.shadowRoot.append(dom);
  return dom;
};

@customElement('ac-snackbar')
export class Snackbar extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      top: 10px;
      right: 10px;
      background: #323232;
      padding: 6px 16px;
      border-radius: 4px;
      z-index: ${Number.MAX_SAFE_INTEGER};
      box-sizing: border-box;
      height: 48px;
      color: white;
      opacity: 0;
      transition: opacity 0.15s;
      pointer-events: none;
    }

    :host(.visible) {
      opacity: 1;
    }

    .content {
      display: flex;
      align-items: center;
      height: 100%;
    }
  `;

  @internalProperty()
  private html = '';

  private _timerId = null;

  public notifyColorCopy(color: string) {
    this.openHtml(`
      <ac-color-spot color='${color}'></ac-color-spot>
      <div>
      ${color} copied!
      </div>
      `);
  }

  private openHtml(html: string) {
    window.clearTimeout(this._timerId);
    this.html = html;
    this.classList.add('visible');
    this._timerId = window.setTimeout(() => {
      this.classList.remove('visible');
    }, DURATION);
  }

  render() {
    return html` <div class="content">${unsafeHTML(this.html)}</div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ac-snackbar': Snackbar;
  }
}
