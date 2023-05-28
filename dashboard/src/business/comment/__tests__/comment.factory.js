// @flow

import moment from 'moment';
import { serverTimeFormat } from '@minibar/store-business/src/__tests__/utils/date';
import { makeBuildFactory, sequence, makeNormalizeFactory } from '@minibar/store-business/src/__tests__/utils/factory';
import { comment_schema } from '../../networking/schemas';
import type { Comment } from '../index';

const default_attrs: Comment = {
  id: sequence(),
  created_at: serverTimeFormat(moment('2017-01-01')),
  note: 'Rap snitches, telling all their business. Sit in the court and be their own star witness',
  author: {name: 'MF DOOM', email: 'metal@face.com'}
};


const traits = {
  from_minibar: {
    author: {
      name: 'brian',
      email: 'brian@minibardelivery.com'
    }
  }
};

const buildFactory = makeBuildFactory(default_attrs, traits);
const normalizeFactory = makeNormalizeFactory(comment_schema);

export default {
  build: buildFactory,
  normalize: normalizeFactory
};
