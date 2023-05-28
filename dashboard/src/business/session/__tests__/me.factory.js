// @flow

import { serverTimeFormat } from '@minibar/store-business/src/__tests__/utils/date';
import moment from 'moment';
import { makeBuildFactory, makeNormalizeFactory } from '@minibar/store-business/src/__tests__/utils/factory';
import { me_schema } from '../../networking/schemas';
import type { Me } from '../index';

const default_attrs: Me = {
  name: 'Brian Cooper',
  email: 'brian@minibardelivery.com',
  supplier: {
    name: 'East Village Farm & Grocery',
    id: 13,
    channel_id: 'this_is_a_channel_id',
    time_zone: 'America/New_York',
    metrics: {
      product_count: 276,
      product_in_stock_count: 237,
      score: 4.76
    },
    shipping_methods: [
      {
        type: 'on_demand',
        opens_at: serverTimeFormat(moment('2017-01-01').add(2, 'hours')),
        closes_at: serverTimeFormat(moment('2017-01-01').add(8, 'hours'))
      },
      {
        type: 'shipped',
        opens_at: serverTimeFormat(moment('2017-01-01').add(2, 'hours')),
        closes_at: serverTimeFormat(moment('2017-01-01').add(8, 'hours'))
      },
      {
        type: 'pickup',
        opens_at: serverTimeFormat(moment('2017-01-01').add(2, 'hours')),
        closes_at: serverTimeFormat(moment('2017-01-01').add(8, 'hours'))
      }
    ],
    shipping_providers: [
      'FedEx',
      'UPS',
      'GSO'
    ]
  }
};

const traits = {
  always_open: {
    supplier: {
      shipping_methods: [
        {
          type: 'on_demand',
          opens_at: serverTimeFormat(moment('2017-01-01')),
          closes_at: serverTimeFormat(moment('2017-01-01').add(24, 'hours'))
        },
        {
          type: 'shipped',
          opens_at: serverTimeFormat(moment('2017-01-01')),
          closes_at: serverTimeFormat(moment('2017-01-01').add(24, 'hours'))
        },
        {
          type: 'pickup',
          opens_at: serverTimeFormat(moment('2017-01-01')),
          closes_at: serverTimeFormat(moment('2017-01-01').add(24, 'hours'))
        }
      ]
    }
  },
  all_but_on_demand: {
    supplier: {
      shipping_methods: [
        {
          type: 'on_demand',
          opens_at: serverTimeFormat(moment('2017-01-01').add(2, 'hours')),
          closes_at: serverTimeFormat(moment('2017-01-01').add(8, 'hours'))
        },
        {
          type: 'shipped',
          opens_at: serverTimeFormat(moment('2017-01-01')),
          closes_at: serverTimeFormat(moment('2017-01-01').add(24, 'hours'))
        },
        {
          type: 'pickup',
          opens_at: serverTimeFormat(moment('2017-01-01')),
          closes_at: serverTimeFormat(moment('2017-01-01').add(24, 'hours'))
        }
      ]
    }
  },
  only_on_demand: {
    supplier: {
      shipping_methods: [
        {
          type: 'on_demand',
          opens_at: serverTimeFormat(moment('2017-01-01')),
          closes_at: serverTimeFormat(moment('2017-01-01').add(24, 'hours'))
        },
        {
          type: 'shipped',
          opens_at: serverTimeFormat(moment('2017-01-01').add(2, 'hours')),
          closes_at: serverTimeFormat(moment('2017-01-01').add(8, 'hours'))
        },
        {
          type: 'pickup',
          opens_at: serverTimeFormat(moment('2017-01-01').add(2, 'hours')),
          closes_at: serverTimeFormat(moment('2017-01-01').add(8, 'hours'))
        }
      ]
    }
  },
  only_shipped: {
    supplier: {
      shipping_methods: [
        {
          type: 'on_demand',
          opens_at: serverTimeFormat(moment('2017-01-01').add(2, 'hours')),
          closes_at: serverTimeFormat(moment('2017-01-01').add(8, 'hours'))
        },
        {
          type: 'shipped',
          opens_at: serverTimeFormat(moment('2017-01-01')),
          closes_at: serverTimeFormat(moment('2017-01-01').add(24, 'hours'))
        },
        {
          type: 'pickup',
          opens_at: serverTimeFormat(moment('2017-01-01').add(2, 'hours')),
          closes_at: serverTimeFormat(moment('2017-01-01').add(8, 'hours'))
        }
      ]
    }
  }
};

const buildFactory = makeBuildFactory(default_attrs, traits);
const normalizeFactory = makeNormalizeFactory(me_schema);

export default {
  build: buildFactory,
  normalize: normalizeFactory
};
