import paper from 'paper';

export class PaperProject extends paper.Project {}

const paperProjectFactory = (): PaperProject => {
  const canvas = document.createElement('canvas');
  canvas.setAttribute(
    'style',
    `
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: ${Number.MAX_SAFE_INTEGER};
        left: 0;
        visibility: hidden;
        `
  );

  const project = new paper.Project(canvas);
  // XXX
  document.body.insertAdjacentElement('afterbegin', project.view.element);
  return project;
};

export const paperProject = paperProjectFactory();
