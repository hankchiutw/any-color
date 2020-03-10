import paper from 'paper';
import { RasterCell } from './raster-cell';

const kInspectorSize = 11;
const kCellSize = 30;
const kStrokeColor = new paper.Color('#444444');

export class RasterInspector {
  private group: paper.Group;
  private cells: RasterCell[] = [];

  public static create(raster: paper.Raster) {
    return new RasterInspector(raster);
  }

  constructor(private raster: paper.Raster) {
    const svg = chrome.runtime.getURL('assets/cursor.svg');
    paper.project.view.element.style.cursor = `url(${svg}) 9 9, auto`;
    this.initGroup();
  }

  public moveTo(point: paper.Point) {
    this.group.position = point;
    this.cells.forEach(c => {
      c.refresh();
    });
  }

  private initGroup() {
    for (let x = 0; x < kInspectorSize; x++) {
      for (let y = 0; y < kInspectorSize; y++) {
        this.cells.push(
          RasterCell.create({
            raster: this.raster,
            pixelAt: new paper.Point(x, y),
            size: kCellSize,
          })
        );
      }
    }

    const radius = kInspectorSize * kCellSize / 2;
    const circleClip = new paper.Shape.Circle({
      center: [radius, radius],
      radius: radius,
    });
    const circleBorder = new paper.Shape.Circle({
      center: [radius, radius],
      radius,
      strokeColor: kStrokeColor,
      strokeWidth: 3,
    });

    this.group = new paper.Group([
      circleClip,
      ...this.cells.map(c => c.raw),
      circleBorder,
    ]);
    this.group.clipped = true;
    this.group.pivot = new paper.Point(0, 0);
  }
}
