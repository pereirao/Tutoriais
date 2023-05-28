// @flow

import moment from 'moment';
import { makeBuildFactory, sequence, makeNormalizeFactory } from '@minibar/store-business/src/__tests__/utils/factory';
import { serverTimeFormat } from '@minibar/store-business/src/__tests__/utils/date';
import { report_schema } from '../../networking/schemas';
import type { Report } from '../index';

const default_attrs: Report = {
  id: sequence(),
  state: 'ready',
  report_url: 'http://www.fakeurl.com',
  report_type: 'ORDERS',
  start_date: serverTimeFormat(moment('2017-01-01')),
  end_date: serverTimeFormat(moment('2017-02-01'))
};

const buildFactory = makeBuildFactory(default_attrs, null);
const normalizeFactory = makeNormalizeFactory(report_schema);

export default {
  build: buildFactory,
  normalize: normalizeFactory
};
