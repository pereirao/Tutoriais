// @flow

type SupplierMetrics = {
  product_count: number,
  product_in_stock_count: number,
  score: number
};

export type ShippingMethod = {
  type: string,
  opens_at: string,
  closes_at: string
};

export type FeatureItems = {
  id: number,
  feature: string,
  status: number,
  created_at: string,
  updated_at: string,
}

export type SupplierBreak = {
  date: string,
  start_time: string,
  end_time: string,
}

export type Supplier = {
  name: string,
  id: number,
  channel_id: string,
  time_zone: string,
  metrics: SupplierMetrics,
  shipping_methods: Array<ShippingMethod>,
  shipping_providers: Array<string>,
  partner_config: {extrasForm: {fields: Array<any>}},
  feature_items: Array<FeatureItems>,
  current_break: SupplierBreak
};

export type Me = {
  name: string,
  email: string,
  supplier: Supplier
};

export * as session_actions from './actions';
export * as session_epics from './epics';
export * as session_helpers from './helpers';
export { default as sessionReducer } from './reducer';
export { default as session_selectors } from './selectors';
