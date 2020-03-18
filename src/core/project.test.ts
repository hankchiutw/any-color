import { Project } from './project';

describe('Project', () => {
  it('should create a Project instance', () => {
    const project = Project.create();
    expect(project).toBeTruthy();
  });
});
