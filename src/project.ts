import paper from 'paper';
import { Inspector } from './inspector';

export class Project {
  private project: paper.Project;

  public static create() {
    return new Project();
  }

  constructor() {
    const canvas = document.createElement('canvas');
    canvas.setAttribute(
      'style',
      `
        width: 100%;
        height: 100%;
        position: fixed;
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

  public setSize(width: number, height: number) {
    this.project.view.viewSize = new paper.Size(width, height);
  }

  public attachInspector(inspector: Inspector) {
    this.project.view.on('mousemove', ({ point }) => {
      inspector.moveTo(point);
    });
  }
}
