// @flow

export type NotificationType = 'comment' | 'unconfirmed';

export type Notification = {
  id: string,
  notification_type: NotificationType,
  order_id: string
};

export * as notification_actions from './actions';
// export { } from './epics';
// export * as notification_helpers from './helpers';
export { default as notificationReducer } from './reducer';
export { default as notification_selectors } from './selectors';
