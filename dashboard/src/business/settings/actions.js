// @flow

import type { Action } from '../store';

export const fetchSettings = (): Action => ({
  type: 'SETTINGS:FETCH',
  payload: {},
  meta: {}
});
