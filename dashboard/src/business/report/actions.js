// @flow

import type { Action } from '../store';

export const fetchReports = (page): Action => ({
  type: 'REPORT:FETCH',
  payload: {},
  meta: { page }
});

export const createReport = (data): Action => ({
  type: 'REPORT:CREATE',
  payload: data
});
