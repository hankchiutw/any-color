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

  pop(message: string) {
    window.clearTimeout(this._timerId);
    this._contentElement.innerHTML = message;
    this._rootElement.style.opacity = '1';
    this._timerId = window.setTimeout(() => {
      this._rootElement.style.opacity = '0';
    }, 1600);
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
      z-index: 999;
      box-sizing: border-box;
      width: 200px;
      height: 48px;
      color: white;
      opacity: 0;
      transition: opacity 0.15s;
    }
    .content {
      display: inline;
      vertical-align: -webkit-baseline-middle;
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
