import {
  LitElement,
  html,
  customElement,
  queryAsync,
  query,
  css,
} from 'lit-element';

@customElement('ac-root')
export class App extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      z-index: ${Number.MAX_SAFE_INTEGER};
      left: 0;
      visibility: inherit;
    }
  `;

  public async injectCanvas(canvas: HTMLCanvasElement): Promise<void> {
    const dom = await this.canvasContainer;
    dom.append(canvas);
  }

  @queryAsync('.canvas-container')
  public canvasContainer: Promise<HTMLElement>;

  @query('canvas')
  public canvas: HTMLCanvasElement;

  render() {
    return html`<div class="canvas-container"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ac-root': App;
  }
}
