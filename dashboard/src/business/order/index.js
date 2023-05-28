// @flow

export type OrderTags = {
  gift: boolean,
  out_of_hours: boolean,
  vip: boolean,
  corporate: boolean,
  scheduled: boolean,
  new_customer: boolean
};

export type BillingInfo = {
  name: string,
  card_type: string,
  card_last4: string
};

export type Address = {
  address1: string,
  address2: string,
  city: string,
  state: string,
  zip_code: string,
  coords: {lat: number, lng: number}
};

export type PickupDetail = {
  id: string,
  name: string,
  phone: string
};

export type Amounts = {
  total: number,
  subtotal: number,
  tax: number,
  tip: number,
  minibar_promos: number,
  store_discounts: number,
  discounts?: number, // FIXME: optional until sunset
  delivery_fee: number,
};

export type DeliveryService = {
  id: number,
  name: string,
  email: string,
  created_at: string,
  updated_at: string,
  minimal_delivery_time: number
}

export type DeliveryMethodType = 'on_demand' | 'shipped' | 'pickup';

export type DeliveryMethod = {
  type: DeliveryMethodType,
  expectation: string
};

export type AttributeFilters = 'vip' | 'gift' | 'scheduled' | 'exception';

export type OrderFilters = {
  date_range: {
    start: string, // iso-8601 timestamp
    end: string // iso-8601 timestamp
  },
  delivery_method_types: Array<DeliveryMethodType>,
  attributes: Array<AttributeFilters>
}

export type ExceptionMetadata = {
  order_item_sku?: string,
  replacement_item?: string,
  replacement_price?: string,
  correct_price?: string,
  incorrect_listing?: string,
  incomplete_address?: string,
  suspected_fraud?: string,
  failed_delivery?: string,
  driver_unavailable_why?: string,
  other?: string,
};

export type ExceptionType = 'out_of_stock' |
  'incorrect_pricing' |
  'incorrect_listing' |
  'incomplete_address' |
  'suspected_fraud' |
  'driver_unavailable' |
  'failed_delivery' |
  'other';

export type Exception = {
  type: ExceptionType,
  description: string,
  metadata: ExceptionMetadata
};

export const PROBLEM_TYPES = [
  'out_of_stock',
  'incorrect_pricing',
  'incorrect_listing',
  'incomplete_address',
  'suspected_fraud',
  'driver_unavailable',
  'failed_delivery',
  'other'
];

export type OrderListName = 'all' | 'active' | 'completed' | 'future';

export type RecipientInfo = { short_name: string, long_name: string, phone: string };

export type TimelineEntryType = 'created_at'
  | 'confirmed_at'
  | 'en_route_at'
  | 'delivered_at'
  | 'canceled_at'
  | 'comment';

export type TimelineEntry = {
  time: string,
  type: TimelineEntryType,
  meta?: { name?: string, driverName?: string }
}

export type OrderState = 'paid'
  | 'confirmed'
  | 'scheduled'
  | 'canceled'
  | 'exception'
  | 'en_route'
  | 'delivered';

export type OrderItem = {
  id: number,
  sku: string,
  name: string,
  item_size: string,
  unit_price: number,
  quantity: number
};

export type Order = {
  id: number,
  number: number,
  created_at: string, // rails timestamp
  confirmed_at: string, // rails timestamp
  canceled_at: string, // rails timestamp
  delivered_at: string, // rails timestamp
  scheduled_for: string, // rails timestamp
  scheduled_for_end: string, // rails timestamp
  order_time: string, // rails timestamp
  birthdate: string,
  notes: string,
  delivery_method: DeliveryMethod,
  state: OrderState,
  gift_message: string,
  recipient_info: RecipientInfo,
  customer_name: string,
  billing: BillingInfo,
  address?: Address,
  pickup_detail?: PickupDetail,
  amounts: Amounts,
  type_tags: OrderTags,
  receipt_url: string,
  order_items: Array<OrderItem>,
  comment_ids: Array<number>, // NOTE: shouldn't be hydrated
  order_adjustment_ids: Array<number>, // NOTE: shouldn't be hydrated
  driver_id: number,
  driver?: any,
  using_delivery_service: boolean,
  delivery_service: DeliveryService
};

export * as order_actions from './actions';
export * as order_helpers from './helpers';
export * as order_epics from './epics';
export { default as orderReducer } from './reducer';
export { default as order_selectors } from './selectors';
