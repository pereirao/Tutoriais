// @flow

import moment from 'moment';
import { serverTimeFormat } from '@minibar/store-business/src/__tests__/utils/date';
import { makeBuildFactory, sequence, makeNormalizeFactory } from '@minibar/store-business/src/__tests__/utils/factory';
import { adjustment_schema } from '../../networking/schemas';
import type { Adjustment } from '../index';

const default_attrs: Adjustment = {
  id: sequence(),
  created_at: serverTimeFormat(moment('2017-01-01')),
  amount: 42.50,
  credit: true,
  reason: 'Fraud'
};


const traits = {
  // TODO: make traits
};

const buildFactory = makeBuildFactory(default_attrs, traits);
const normalizeFactory = makeNormalizeFactory(adjustment_schema);

export default {
  build: buildFactory,
  normalize: normalizeFactory
};
