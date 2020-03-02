export class PixelImage {
  private canvas: HTMLCanvasElement = document.createElement('canvas');
  // private ctx: CanvasRenderingContext2D;
  private imageData: Uint8ClampedArray;

  constructor(img: HTMLImageElement) {
    img.addEventListener('load', () => {
      this.canvas.width = img.width;
      this.canvas.height = img.height;
      const ctx = this.canvas.getContext('2d');
      if (!ctx) {
        throw new Error('null ctx');
      }

      ctx.drawImage(img, 0, 0, img.width, img.height);
      this.imageData = ctx.getImageData(0, 0, img.width, img.height).data;

      // XXX
      document.body.insertAdjacentElement('afterbegin', this.canvas)
    });
  }

  public static create({ width, height, src }) {
    const img = new Image(width, height);
    img.src = src;
    return new PixelImage(img);
  }

  /**
   * Get the pixel color in RGBA form that can be used as CSS style.
   */
  public rgbAt(x: number, y: number): string {
    const startIndex = (y * this.canvas.width + x) * 4;
    const [r, g, b, a] = Array.from(this.imageData.slice(startIndex, startIndex + 4));
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}
