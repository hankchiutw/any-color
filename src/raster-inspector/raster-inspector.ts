import paper from 'paper';
import { createCursor, createCircleMask } from './primitive-factory';
import { RasterCell } from './raster-cell';

const kInspectorSize = 11; // should be odd
const kCellSize = 30;

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
    const cursor = createCursor();

    // make the inspector center representing the cursor center
    const offset = cursor.position.subtract((kInspectorSize - 1) / 2);
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

    const magnifier = createCircleMask({
      radius: (kInspectorSize * kCellSize) / 2,
      children: this.cells.map(c => c.raw),
    });
    this.cells[(this.cells.length - 1) / 2].highlight();

    this.group = new paper.Group([magnifier, cursor]);
    this.group.pivot = new paper.Point(0, 0);
  }


}
