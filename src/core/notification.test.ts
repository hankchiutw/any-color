import { Notification } from './notification';
import '~/content';
import { container } from '~/common';

describe('Notification', () => {
  it('should create a Notification instance', () => {
    const notification = container.get(Notification);
    expect(notification).toBeTruthy();
  });
});
