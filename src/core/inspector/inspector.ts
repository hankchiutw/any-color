import { injectable } from 'inversify';
import paper from 'paper';
import { PaperProject } from '../paper-project';
import { PixelCell } from './pixel-cell';
import { createCursor, createCircleMask } from './primitive-factory';
import 'reflect-metadata';

const kInspectorSize = 11; // should be odd
const kCellSize = 30;

@injectable()
export class Inspector {
  private group: paper.Group;
  private cells: PixelCell[] = [];
  private raster: paper.Raster;

  private get targetCell() {
    return this.cells[(this.cells.length - 1) / 2];
  }

  constructor(private project: PaperProject) {
    this.initUI();
    this.trackMouse();
  }

  public loadImage(img: HTMLImageElement) {
    img.addEventListener('load', () => {
      const raster = new paper.Raster(img);
      raster.position = new paper.Point(img.width / 2, img.height / 2);
      raster.width = img.width;
      raster.height = img.height;
      raster.visible = false;
      this.raster = raster;

      // refresh
      this.moveTo(this.group.position);
    });
  }

  /**
   * Update inspector's position.
   *
   * @remarks
   * Update cell colors in the meanwhile if having the rater image.
   */
  private moveTo(point: paper.Point) {
    this.group.position = point;
    if (this.raster) {
      this.cells.forEach((cell) => {
        cell.setColor(this.raster.getPixel(cell.position));
      });
    }
  }

  /**
   * Initialize inspector UI items, including the cursor and circular magnifier.
   */
  private initUI() {
    const cursor = createCursor();

    // make the inspector center representing the cursor center
    const offset = cursor.position.subtract((kInspectorSize - 1) / 2);
    for (let x = 0; x < kInspectorSize; x++) {
      for (let y = 0; y < kInspectorSize; y++) {
        this.cells.push(
          PixelCell.create({
            pixelAt: new paper.Point(x, y),
            pivot: new paper.Point(x, y).add(offset),
            size: kCellSize,
          })
        );
      }
    }

    const magnifier = createCircleMask({
      radius: (kInspectorSize * kCellSize) / 2,
      children: this.cells.map((c) => c.raw),
    });
    this.targetCell.highlight();

    this.group = new paper.Group([magnifier, cursor]);
    this.group.pivot = new paper.Point(0, 0);
  }

  /**
   * Keep inspector's position sync with mouse.
   */
  private trackMouse() {
    this.project.view.on('mousemove', ({ point }) => {
      this.moveTo(point);
    });

    document.body.addEventListener('mouseenter', ({ clientX, clientY }) => {
      this.moveTo(new paper.Point(clientX, clientY));
    });
  }
}
