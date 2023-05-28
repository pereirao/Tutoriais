// @flow

export type Variant = {
  id: number,
  name: string,
  volume: string,
  inventory: number,
  sku: string,
  active: boolean,
  price: number,
  sale_price: number,
  category: string
};

export * as variant_epics from './epics';
export * as variant_actions from './actions';
export * as variant_helpers from './helpers';
export { default as variantReducer } from './reducer';
export { default as variant_selectors } from './selectors';

