const DURATION = 2000;

class UiSnackbar extends HTMLElement {
  private _shadow: ShadowRoot;

  private get _rootElement(): HTMLElement {
    return this._shadow.host as HTMLElement;
  }
  private get _contentElement() {
    return this._shadow.querySelector('.content');
  }

  private _timerId = null;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'closed' });
    this._shadow.innerHTML = this.render();
  }

  popHtml(html: string) {
    window.clearTimeout(this._timerId);
    this._contentElement.innerHTML = html;
    this._rootElement.style.opacity = '1';
    this._timerId = window.setTimeout(() => {
      this._rootElement.style.opacity = '0';
    }, DURATION);
  }

  render() {
    return `
    <style>
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

    .content {
      display: flex;
      align-items: center;
      height: 100%;
    }
    </style>
      <div class='content'>x</div>
    `;
  }
}

customElements.define('ui-snackbar', UiSnackbar);

declare global {
  interface HTMLElementTagNameMap {
    'ui-snackbar': UiSnackbar;
  }
}

export {};
