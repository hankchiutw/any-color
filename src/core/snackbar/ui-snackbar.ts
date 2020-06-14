import {
  LitElement,
  html,
  customElement,
  internalProperty,
  css,
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

const DURATION = 2000;

@customElement('ui-snackbar')
export class UiSnackbar extends LitElement {
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
  private html = 'x';

  private _timerId = null;

  popHtml(html: string) {
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
    'ui-snackbar': UiSnackbar;
  }
}
