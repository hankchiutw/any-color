import { Snackbar } from './snackbar';
import '~/content';
import { container } from '~/common';

describe('Snackbar', () => {
  it('should create a Snackbar instance', () => {
    const snackbar = container.get(Snackbar);
    expect(snackbar).toBeTruthy();
  });
});
