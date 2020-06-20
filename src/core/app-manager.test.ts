import { AppManager } from './app-manager';
import '~/content';
import { container } from '~/common';

describe('AppManager', () => {
  it('should create a AppManager instance', () => {
    const project = container.get(AppManager);
    expect(project).toBeTruthy();
  });
});
