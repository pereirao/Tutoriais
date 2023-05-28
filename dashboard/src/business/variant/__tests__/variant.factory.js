// @flow

import { makeBuildFactory, sequence, makeNormalizeFactory } from '@minibar/store-business/src/__tests__/utils/factory';
import { variant_schema } from '../../networking/schemas';
import type { Variant } from '../index';

const default_attrs: Variant = {
  id: sequence(),
  sku: 'this_is_a_sku',
  product_name: 'Good good drink',
  inventory: 10,
  price: 19.99,
  sale_price: 0
};

const traits = {
  on_sale: {
    sale_price: 10.99
  },
  out_of_stock: {
    inventory: 0
  }
};

const buildFactory = makeBuildFactory(default_attrs, traits);
const normalizeFactory = makeNormalizeFactory(variant_schema);

export default {
  build: buildFactory,
  normalize: normalizeFactory
};
