import { Project } from './project';
import '~/content';
import { container } from '~/common';

describe('Project', () => {
  it('should create a Project instance', () => {
    const project = container.get(Project);
    expect(project).toBeTruthy();
  });
});
