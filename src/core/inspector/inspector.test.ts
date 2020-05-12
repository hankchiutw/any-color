import { Inspector } from './inspector';
import '~/content';
import { container } from '~/common';

describe('Inspector', () => {
  it('should create a Inspector instance', () => {
    const inspector = container.get(Inspector);
    expect(inspector).toBeTruthy();
  });
});
