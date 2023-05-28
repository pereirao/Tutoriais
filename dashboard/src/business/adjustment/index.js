// @flow

export type Adjustment = {
  id: number,
  created_at: string, // rails timestamp
  amount: number,
  credit: boolean,
  reason: string,
  description: string
};

export * as adjustment_actions from './actions';
export * as adjustment_epics from './epics';
export * as adjustment_helpers from './helpers';
export { default as adjustmentReducer } from './reducer';
export { default as adjustment_selectors } from './selectors';
