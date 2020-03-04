import paper from 'paper';

const kInspectorSize = 11;
const kCellSize = 30;

export class RasterInspector {
  private group: paper.Group;

  constructor(private raster: paper.Raster) {
    const children = [];
    for (let x = 0; x < kInspectorSize; x++) {
      for (let y = 0; y < kInspectorSize; y++) {
        children.push(
          new paper.Path.Rectangle({
            point: [x * kCellSize, y * kCellSize],
            size: [kCellSize, kCellSize],
            strokeColor: new paper.Color('#646464'),
          })
        );
      }
    }

    this.group = new paper.Group(...children);
    this.group.pivot = new paper.Point(0, 0);
  }

  public moveTo(point: paper.Point) {
    this.group.position = point;
    this.updateCells(point);
  }

  /**
   * Load cells arround the point
   */
  private updateCells(point: paper.Point) {
    this.group.children.forEach((cell: paper.Item) => {
      cell.fillColor = this.raster.getPixel(point);
    });
  }
}
