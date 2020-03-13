import paper from 'paper';

const kStrokeColor = new paper.Color('#646464');
const kHighlightStrokeColor = new paper.Color('#ff2020');
const kHighlightStrokeWidth = 3;

export interface RasterCellInit {
  raster: paper.Raster;
  pixelAt: paper.Point;
  pivot: paper.Point;
  size: number;
}

/**
 * A class representing a pixel on a paper.Raster.
 *
 * @remarks
 * The cell rectangle is located wthin a coordinate having one unit equalts to `size`.
 */
export class RasterCell {
  private raster: paper.Raster;
  private rect: paper.Path.Rectangle;

  public static create(init: RasterCellInit) {
    const cell = new RasterCell(init);
    return cell;
  }

  constructor({ raster, pixelAt, pivot, size }: RasterCellInit) {
    this.raster = raster;
    this.rect = new paper.Path.Rectangle({
      point: pixelAt.multiply(size),
      size: [size, size],
      strokeColor: kStrokeColor,
      fillColor: raster.getPixel(pixelAt),
    });
    this.rect.pivot = pivot;
  }

  public get raw(): paper.Item {
    return this.rect;
  }

  /**
   * @remarks
   * Color string in hex.
   */
  public get color() {
    return this.rect.fillColor.toCSS(true);
  }

  public refresh() {
    this.rect.fillColor = this.raster.getPixel(this.rect.position);
  }

  public highlight() {
    this.rect.bringToFront();
    this.rect.strokeColor = kHighlightStrokeColor;
    this.rect.strokeWidth = kHighlightStrokeWidth;
  }
}
