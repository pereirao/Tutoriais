// @flow

import type { Action } from '../store';

export const createNotificationMethod = (data): Action => ({
  type: 'NOTIFICATION_METHOD:CREATE',
  payload: data,
  meta: {}
});

export const destroyNotificationMethod = (notification_method_id: number): Action => ({
  type: 'NOTIFICATION_METHOD:DESTROY',
  payload: { notification_method_id }
});

//TODO: make options block real
export const fetchNotificationMethods = (notification_method_ids: Array<number>, options: Object): Action => ({
  type: 'NOTIFICATION_METHOD:FETCH',
  payload: {
    notification_method_ids
  },
  meta: {
    options
  }
});

export const updateNotificationMethod = (data): Action => ({
  type: 'NOTIFICATION_METHOD:UPDATE',
  payload: data,
  meta: { id: data.id }
});

export const resetNewNotificationMethodForm = (data): Action => ({
  type: 'NOTIFICATION_METHOD:RESET_NEW_NOTIFICATION_METHOD_FORM',
  payload: data
});

