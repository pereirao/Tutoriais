// @flow

import { makeBuildFactory, sequence, makeNormalizeFactory } from '@minibar/store-business/src/__tests__/utils/factory';
import { notification_schema } from '../../networking/schemas';
import type { Notification } from '../index';

const default_attrs: Notification = {
  id: sequence(),
  notification_type: 'comment',
  order_id: 10
};

const traits = {
  // TODO: add traits
};

const buildFactory = makeBuildFactory(default_attrs, traits);
const normalizeFactory = makeNormalizeFactory(notification_schema);

export default {
  build: buildFactory,
  normalize: normalizeFactory
};
