// @flow

import { makeBuildFactory, sequence, makeNormalizeFactory } from '@minibar/store-business/src/__tests__/utils/factory';
import { employee_schema } from '../../networking/schemas';
import type { Employee } from '../index';

const default_attrs: Employee = {
  id: sequence(),
  first_name: 'Test',
  last_name: 'Employee',
  email: 'test@test.com',
  roles: ['supplier'],
  active: true
};

const traits = {
  is_driver: {
    roles: ['supplier', 'driver']
  }
};

const buildFactory = makeBuildFactory(default_attrs, traits);
const normalizeFactory = makeNormalizeFactory(employee_schema);

export default {
  build: buildFactory,
  normalize: normalizeFactory
};
