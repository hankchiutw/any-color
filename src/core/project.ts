import { injectable } from 'inversify';
import paper from 'paper';
import { PaperProject } from './paper-project';
import 'reflect-metadata';

@injectable()
export class Project {
  private view: paper.View;

  constructor(private project: PaperProject) {
    this.view = this.project.view;
    this.hide();
  }

  public get visible() {
    return this.view.element.style.visibility !== 'hidden';
  }

  public setSize(width: number, height: number) {
    this.view.viewSize = new paper.Size(width, height);
  }

  public hide() {
    this.view.element.style.visibility = 'hidden';
    this.view.element.style.cursor = `inherit`;
  }

  public show() {
    this.view.element.style.visibility = 'inherit';
    this.view.element.style.cursor = `none`;
    this.view.requestUpdate();
  }
}
