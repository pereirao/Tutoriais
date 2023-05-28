// @flow

export type NotificationMethod = {
  id: number,
  type: string,
  value: string,
  label: string,
  active: boolean
};

export * as notification_method_epics from './epics';
export * as notification_method_actions from './actions';
export * as notification_method_helpers from './helpers';
export { default as notificationMethodReducer } from './reducer';
export { default as notification_method_selectors } from './selectors';
