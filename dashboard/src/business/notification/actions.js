// @flow

import { v4 as uuid } from 'uuid';
import type NotificationType from './index';

export const pushNotification = (notification_type: NotificationType, order_id: string) => ({
  type: 'NOTIFICATION:PUSH',
  payload: {
    id: uuid(),
    notification_type,
    order_id
  }
});

export const removeNotification = (notification_id: string) => ({
  type: 'NOTIFICATION:REMOVE',
  payload: { notification_id }
});
