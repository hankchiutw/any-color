class UiColorSpot extends HTMLElement {
  private _shadow: ShadowRoot;

  private get _rootElement(): HTMLElement {
    return this._shadow.host as HTMLElement;
  }

  public get color() {
    return this._rootElement.getAttribute('color');
  }

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'closed' });
    this._shadow.innerHTML = this.render();
  }

  render() {
    return `
    <style>
    :host {
      box-sizing: border-box;
      display: block;
      border-radius: 3px;
      width: 20px;
      height: 20px;
      margin: 6px;
      background-color: ${this.color};
    }
    </style>
    `;
  }
}

customElements.define('ui-color-spot', UiColorSpot);

declare global {
  interface HTMLElementTagNameMap {
    'ui-color-spot': UiColorSpot;
  }
}

export {};
