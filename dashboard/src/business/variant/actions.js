// @flow

import type { Action } from '../store';

//TODO: make options block real
export const fetchVariants = (options: Object): Action => ({
  type: 'VARIANT:FETCH',
  payload: { },
  meta: options
});

export const updateVariant = (data): Action => ({
  type: 'VARIANT:UPDATE',
  payload: data,
  meta: { id: data.sku }
});
