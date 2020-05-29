class UiSnackbar extends HTMLElement {
  private _shadow: ShadowRoot;

  private get _contentElement() {
    return this._shadow.querySelector('.content');
  }
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'closed' });
    this._shadow.innerHTML = this.render();
  }

  pop(message: string) {
    this._contentElement.innerHTML = message;
  }

  render() {
    return `
    <style>
    :host {
      position: fixed;
      top: 10px;
      right: 10px;
      background: white;
      border: solid 1px #cccccc;
      padding: 10px;
      border-radius: 4px;
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
