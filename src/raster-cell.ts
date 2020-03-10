import paper from 'paper';

const kStrokeColor = new paper.Color('#646464');

export interface RasterCellInit {
  raster: paper.Raster;
  pixelAt: paper.Point;
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

  constructor({ raster, pixelAt, size }: RasterCellInit) {
    this.raster = raster;
    this.rect = new paper.Path.Rectangle({
      point: pixelAt.multiply(size),
      size: [size, size],
      strokeColor: kStrokeColor,
      fillColor: raster.getPixel(pixelAt),
    });
    this.rect.pivot = pixelAt;
  }

  public get raw(): paper.Item {
    return this.rect;
  }

  public refresh() {
    this.rect.fillColor = this.raster.getPixel(this.rect.position);
  }
}
