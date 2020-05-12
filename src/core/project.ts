import { injectable } from 'inversify';
import paper from 'paper';
import { Inspector } from './inspector';
import 'reflect-metadata';

@injectable()
export class Project {
  private project: paper.Project;
  private view: paper.View;

  constructor() {
    this.initProject();
  }

  public get visible() {
    return this.view.element.style.opacity === '1';
  }

  public setSize(width: number, height: number) {
    this.view.viewSize = new paper.Size(width, height);
  }

  public hide() {
    this.view.element.style.opacity = '0';
    this.view.element.style.cursor = `inherit`;
  }

  public show() {
    this.view.element.style.opacity = '1';
    this.view.element.style.cursor = `none`;
    this.view.requestUpdate();
  }

  // TODO: inject paper.Project to Inspector and track mouse there
  public attachInspector(inspector: Inspector) {
    this.view.on('mousemove', ({ point }) => {
      inspector.moveTo(point);
    });
  }

  private initProject() {
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
    this.view = this.project.view;
    // XXX
    document.body.insertAdjacentElement('afterbegin', this.view.element);
  }
}
