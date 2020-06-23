import paper from 'paper';
import { Inspector } from './inspector';
export * from './inspector';

export const inspectorFactory = (canvas: HTMLCanvasElement): Inspector => {
  const project = new paper.Project(canvas);
  const inspector = new Inspector(project);
  return inspector;
};
