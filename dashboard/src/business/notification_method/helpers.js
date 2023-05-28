//@flow

import type { NotificationMethod } from './index';

export const NOTIFICATION_METHOD_COLUMN_ORDER = ['mobile_summary', 'notification_type', 'value', 'label', 'active', 'edit'];

export const notificationMethodTableRow = (notification_method: NotificationMethod) => {
  return ({
    notification_type: notification_method.notification_type,
    value: notification_method.value,
    label: notification_method.label,
    active: notification_method.active ? 'Active' : 'Inactive'
  });
};
