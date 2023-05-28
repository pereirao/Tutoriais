// @flow
import { createAction } from 'redux-actions';

export const openOrderStateModal = createAction('UI:OPEN_ORDER_STATE_MODAL', (order_id: string) => ({
  order_id
}));
export const closeOrderStateModal = createAction('UI:CLOSE_ORDER_STATE_MODAL');

export const forceRefresh = createAction('UI:FORCE_REFRESH');

export const openSubstituteModal = createAction('UI:OPEN_SUBSTITUTE_MODAL');
export const closeSubstituteModal = createAction('UI:CLOSE_SUBSTITUTE_MODAL');
