import { notificationMethodTableRow } from '../helpers';
import notification_method_factory from './notification_method.factory';

describe('notificationMethodTableRow', () => {
  const notificationMethod = notification_method_factory.build();
  it('returns object containing formatted type, value, label, and status', () => {
    expect(notificationMethodTableRow(notificationMethod)).toEqual({
      notification_type: notificationMethod.notification_type,
      value: notificationMethod.value,
      label: notificationMethod.label,
      active: 'Active'
    });
  });
});
