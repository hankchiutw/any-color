import paper from 'paper';
import { RasterCell } from './raster-cell';

const kInspectorSize = 11;
const kCellSize = 30;
const kStrokeColor = new paper.Color('#444444');
const kStrokeWidth = 3;
const kCursorRaduis = 14;
const kCursorOffset = 18;

function createCursor() {
  const cursor = new paper.Group([
    new paper.Path.Circle({
      center: new paper.Point(kCursorOffset, kCursorOffset),
      radius: kCursorRaduis,
      strokeWidth: kStrokeWidth * 2,
      strokeColor: kStrokeColor,
    }),
  ]);
  return cursor;
}

export class RasterInspector {
  private group: paper.Group;
  private cells: RasterCell[] = [];

  public static create(raster: paper.Raster) {
    return new RasterInspector(raster);
  }

  constructor(private raster: paper.Raster) {
    paper.project.view.element.style.cursor = `none`;
    this.initGroup();
  }

  public moveTo(point: paper.Point) {
    this.group.position = point;
    this.cells.forEach(c => {
      c.refresh();
    });
  }

  private initGroup() {
    this.group = new paper.Group([this.createMagnifier(), createCursor()]);
    this.group.pivot = new paper.Point(0, 0);
  }

  /**
   * Create the magnifier having magnified pixels.
   */
  private createMagnifier() {
    // make the inspector center representing the cursor center
    const offset = kCursorOffset - (kInspectorSize - 1) / 2;

    for (let x = 0; x < kInspectorSize; x++) {
      for (let y = 0; y < kInspectorSize; y++) {
        this.cells.push(
          RasterCell.create({
            raster: this.raster,
            pixelAt: new paper.Point(x, y),
            pivot: new paper.Point(x, y).add(offset),
            size: kCellSize,
          })
        );
      }
    }

    const radius = (kInspectorSize * kCellSize) / 2;
    const circleClip = new paper.Shape.Circle({
      center: [radius, radius],
      radius: radius,
    });
    const circleBorder = new paper.Shape.Circle({
      center: [radius, radius],
      radius,
      strokeColor: kStrokeColor,
      strokeWidth: kStrokeWidth,
    });

    const magnifier = new paper.Group([
      circleClip,
      ...this.cells.map(c => c.raw),
      circleBorder,
    ]);
    magnifier.clipped = true;
    return magnifier;
}
}
