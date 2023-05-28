// @flow

import type { OrderState, OrderListName } from './index';
import type { Action } from '../store';


export const fetchOrder = (order_id: string, options: {notify: boolean} = {notify: false}): Action => ({
  type: 'ORDER:FETCH_ORDER',
  payload: { order_id },
  meta: options
});

type UpdateParams = {
  state?: OrderState,
  delivery_estimate_id?: number,
  scheduled_for?: string,
  driver_id?: string,
  signed_by_name?: string,
  exception?: Exception
};
export const updateOrder = (order_id: string, params: UpdateParams): Action => ({
  type: 'ORDER:UPDATE_ORDER',
  payload: { order_id, params },
  meta: {}
});

//TODO: make options type real

export const makeFetchList = (list_name: OrderListName) => (options: Object): Action => ({
  type: `ORDER:FETCH_${list_name.toUpperCase()}`,
  meta: options
});

export const fetchAll = (options: Object): Action => ({
  type: 'ORDER:FETCH_ALL',
  meta: options
});

export const fetchActive = (options: Object): Action => ({
  type: 'ORDER:FETCH_ACTIVE',
  meta: options
});

export const fetchCompleted = (options: Object): Action => ({
  type: 'ORDER:FETCH_COMPLETED',
  meta: options
});

export const fetchFuture = (options: Object): Action => ({
  type: 'ORDER:FETCH_FUTURE',
  meta: options
});

export const markListsStale = (): Action => ({type: 'ORDER:MARK_LISTS_STALE'});
