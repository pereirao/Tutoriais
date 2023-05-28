// @flow

import { makeBuildFactory, sequence, makeNormalizeFactory } from '@minibar/store-business/src/__tests__/utils/factory';
import { notification_method_schema } from '../../networking/schemas';
import type { NotifictionMethod } from '../index';

const default_attrs: NotifictionMethod = {
  id: sequence(),
  type: 'sms',
  value: '1234567890',
  label: 'default_factory_notification_method',
  active: true
};

const buildFactory = makeBuildFactory(default_attrs, null);
const normalizeFactory = makeNormalizeFactory(notification_method_schema);

export default {
  build: buildFactory,
  normalize: normalizeFactory
};
