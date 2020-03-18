import { Project } from '../project';
import { Inspector } from './inspector';

describe('Inspector', () => {
  beforeAll(() => {
    Project.create();
  });

  it('should create a Inspector instance', () => {
    const inspector = Inspector.create();
    expect(inspector).toBeTruthy();
  });
});
