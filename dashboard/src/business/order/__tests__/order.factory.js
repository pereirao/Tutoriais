// @flow

import moment from 'moment';
import { serverTimeFormat } from '@minibar/store-business/src/__tests__/utils/date';
import { makeBuildFactory, sequence, makeNormalizeFactory } from '@minibar/store-business/src/__tests__/utils/factory';
import { order_schema } from '../../networking/schemas';
import type { Order } from '../index';

const default_attrs: Order = {
  id: sequence(),
  number: sequence(),
  order_time: serverTimeFormat(moment('2017-01-01')),
  notes: 'Ring the doorbell',
  state: 'paid',
  recipient_info: { short_name: 'Biggie Smalls', long_name: 'Biggie Smalls - East Coast', phone: '5555555555' },
  customer_name: 'Biggie Smalls',
  billing: { cc_type: 'Amex', last_digits: '4321' }, // TODO: trait
  delivery_method: {
    type: 'on_demand',
    maximum_delivery_expectation: 60
  },
  address: {
    address1: '21 Jump Street',
    address2: 'Apt 5',
    city: 'Brooklyn',
    state: 'NY',
    zip_code: 11206,
    coords: {lat: 40.719507, lng: -73.941461}
  },
  amounts: {
    minibar_promos: 2.35,
    store_discounts: 2.00,
    delivery_fee: 5,
    tax: 3.48,
    tip: 4.35,
    total: 51.95,
    subtotal: 43.47
  },
  type_tags: {
    gift: false,
    out_of_hours: false,
    vip: true,
    corporate: false,
    scheduled: false
  },
  receipt_url: 'http://www.minibardelivery.com',
  order_items: [],
  comment_ids: [],
  driver_id: 15
};


const traits = {
  with_order_adjustment_ids: {order_adjustment_ids: [1, 2]},
  with_comment_ids: {comment_ids: [1, 2]},
  with_order_items: {
    order_items: [
      {
        id: 1,
        sku: 'asdfghjkl',
        name: 'Budweiser Light',
        item_size: '6 pack, 12 oz bottles',
        unit_price: 12.49,
        quantity: 3
      },
      {
        id: 2,
        sku: 'qweryuoo',
        name: 'Cupcake',
        item_size: '750 ml bottle',
        unit_price: 10.49,
        quantity: 2
      }
    ]
  },
  scheduled_for: {
    scheduled_for: serverTimeFormat(moment('2017-01-01').add(4, 'hours')),
    scheduled_for_end: serverTimeFormat(moment('2017-01-01').add(6, 'hours')),
    type_tags: {
      gift: false,
      out_of_hours: false,
      vip: false,
      corporate: false,
      scheduled: true
    }
  },
  gift: {
    gift_message: 'this one is for you',
    type_tags: {
      gift: true,
      out_of_hours: false,
      vip: true,
      corporate: false,
      scheduled: false
    }
  },
  pickup: {
    delivery_method: {
      type: 'pickup',
      maximum_delivery_expectation: 60
    },
    pickup_detail: {
      id: sequence(),
      name: 'Talib Kweli',
      phone: '5556667777'
    },
    address: undefined
  },
  shipped: {
    delivery_method: {
      type: 'shipped',
      maximum_delivery_expectation: 120
    }
  },
  paid: {
    state: 'paid',
    created_at: serverTimeFormat(moment('2017-01-02'))
  },
  scheduled: {
    state: 'scheduled',
    created_at: serverTimeFormat(moment('2017-01-02'))
  },
  confirmed: {
    state: 'confirmed',
    created_at: serverTimeFormat(moment('2017-01-02')),
    confirmed_at: serverTimeFormat(moment('2017-01-03'))
  },
  en_route: {
    state: 'en_route',
    created_at: serverTimeFormat(moment('2017-01-02')),
    confirmed_at: serverTimeFormat(moment('2017-01-03')),
    en_route_at: serverTimeFormat(moment('2017-01-04'))
  },
  delivered: {
    state: 'delivered',
    created_at: serverTimeFormat(moment('2017-01-02')),
    confirmed_at: serverTimeFormat(moment('2017-01-03')),
    en_route_at: serverTimeFormat(moment('2017-01-04')),
    delivered_at: serverTimeFormat(moment('2017-01-05'))
  },
  canceled: {
    state: 'canceled',
    canceled_at: serverTimeFormat(moment('2017-01-04'))
  },
  exception: {
    state: 'exception'
  }
};

const buildFactory = makeBuildFactory(default_attrs, traits);
const normalizeFactory = makeNormalizeFactory(order_schema);

export default {
  build: buildFactory,
  normalize: normalizeFactory
};
