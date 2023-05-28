// @flow

export type Report = {
  id: number,
  state: string,
  report_url: string,
  report_type: string,
  start_date: string, // rails timestamp
  end_date: string, // rails timestamp
};

export * as report_epics from './epics';
export * as report_actions from './actions';
export * as report_helpers from './helpers';
export { default as reportReducer } from './reducer';
export { default as report_selectors } from './selectors';
