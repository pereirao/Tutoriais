// @flow

export type Employee = {
  id: number,
  name: string,
  email: string,
  phone: number,
  active: boolean
};

export type NotificationMethod = {
  id: number,
  type: string,
  value: string,
  label: string,
  active: boolean
};

export type WorkingHour = {
  wday: number,
  off: boolean,
  starts_at: string,
  ends_at: string
}

export * as settings_helpers from './helpers';
export * as settings_actions from './actions';
export * as settings_epics from './epics';
export { default as settingsReducer } from './reducer';
export { default as settings_selectors } from './selectors';
