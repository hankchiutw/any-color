import paper from 'paper';
import { RasterInspector } from './raster-inspector';

export class PixelImage {
  private project: paper.Project;
  private inspector: RasterInspector;

  public static create({ width, height, src }) {
    const img = new Image(width, height);
    img.src = src;
    return new PixelImage(img);
  }

  constructor(img: HTMLImageElement) {
    this.initProject(img.width, img.height);
    img.addEventListener('load', () => {
      this.initInspector(img);
    });
  }

  private initProject(width: number, height: number) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute(
      'style',
      `
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 999;
        `
    );

    this.project = new paper.Project(canvas);
    // XXX
    document.body.insertAdjacentElement(
      'afterbegin',
      this.project.view.element
    );
  }

  private initInspector(img: HTMLImageElement) {
    const raster = new paper.Raster(img);
    raster.position = this.project.view.center;
    raster.width = img.width;
    raster.height = img.height;
    raster.visible = false;
    this.inspector = new RasterInspector(raster);

    this.project.view.on('mousemove', ({ point }) => {
      this.inspector.moveTo(point);
    });
  }
}
