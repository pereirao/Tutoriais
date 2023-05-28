// @flow

import _ from 'lodash';
import { combineReducers } from 'redux';
import type { Order } from './index';
import type { Action } from '../store';

type ById = {[id: number]: Order};

export const byIdReducer = (state: ById = {}, action: Action) => {
  switch (action.type){
    case 'ORDER:FETCH_ORDER__SUCCESS':
    case 'ORDER:UPDATE_ORDER__SUCCESS':
    case 'ORDER:FETCH_ACTIVE__SUCCESS':
    case 'ORDER:FETCH_COMPLETED__SUCCESS':
    case 'ORDER:FETCH_FUTURE__SUCCESS':
    case 'ORDER:FETCH_ALL__SUCCESS':
      return {...state, ...(action.payload.entities.order || {})};
    case 'ADJUSTMENT:FETCH__SUCCESS':{
      const { result } = action.payload;
      const { order_id } = action.meta;
      const updated_order_by_id = {[order_id]: {...state[order_id], order_adjustment_ids: result}};
      return { ...state, ...updated_order_by_id };
    }
    case 'COMMENT:ADD__SUCCESS':{
      const { result } = action.payload;
      const { order_id } = action.meta;
      const updated_order_by_id = {[order_id]: {...state[order_id], comment_ids: [...state[order_id].comment_ids, result] }};
      return { ...state, ...updated_order_by_id };
    }
    case 'COMMENT:FETCH__SUCCESS':{
      const { result } = action.payload;
      const { order_id } = action.meta;
      const updated_order_by_id = {[order_id]: {...state[order_id], comment_ids: result}};
      return { ...state, ...updated_order_by_id };
    }
    default:
      return state;
  }
};

export const isFetchingReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'ORDER:FETCH_ACTIVE__LOADING':
    case 'ORDER:FETCH_COMPLETED__LOADING':
    case 'ORDER:FETCH_FUTURE__LOADING':
    case 'ORDER:FETCH_ALL__LOADING':
      return true;
    case 'ORDER:FETCH_ACTIVE__SUCCESS':
    case 'ORDER:FETCH_ACTIVE__ERROR':
    case 'ORDER:FETCH_COMPLETED__SUCCESS':
    case 'ORDER:FETCH_COMPLETED__ERROR':
    case 'ORDER:FETCH_FUTURE__SUCCESS':
    case 'ORDER:FETCH_FUTURE__ERROR':
    case 'ORDER:FETCH_ALL__SUCCESS':
    case 'ORDER:FETCH_ALL__ERROR':
      return false;
    default:
      return state;
  }
};

export const isUpdatingReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'ORDER:UPDATE_ORDER__LOADING':
      return true;
    case 'ORDER:UPDATE_ORDER__SUCCESS':
    case 'ORDER:UPDATE_ORDER__ERROR':
      return false;
    default:
      return state;
  }
};

export const EMPTY_FILTERS = {
  date_range: {start: null, end: null},
  delivery_method_types: [],
  attributes: []
};

type OrderList = {
  ids: Array<string>,
  total_count: number,
  total_pages: number,
  next_page: number,
  query: string,
  filters: OrderFilters,
  is_stale: boolean
};
export const makeOrderListReducers = (update_action_type: string) => {
  const idsReducer = (state: Array<string> = [], action: Action) => {
    switch (action.type){
      case update_action_type:{
        if (action.meta.page === 1) return action.payload.result.orders;
        return _.uniq([...state, ...action.payload.result.orders]);
      }
      default:
        return state;
    }
  };
  const totalCountReducer = (state: number = 0, action: Action) => {
    switch (action.type){
      case update_action_type:
        return action.payload.result.total_count;
      default:
        return state;
    }
  };
  const totalPagesReducer = (state: number = 1, action: Action) => {
    switch (action.type){
      case update_action_type:
        return action.payload.result.total_pages;
      default:
        return state;
    }
  };
  const nextPageReducer = (state: number = 1, action: Action) => {
    switch (action.type){
      case update_action_type:
        return action.payload.result.total_count === 0 ? action.meta.page : action.meta.page + 1;
      default:
        return state;
    }
  };
  const queryReducer = (state: string = '', action: Action) => {
    switch (action.type){
      case update_action_type:
        return _.get(action.meta, 'query') || '';
      default:
        return state;
    }
  };
  const filtersReducer = (state: OrderFilters = EMPTY_FILTERS, action: Action) => {
    switch (action.type){
      case update_action_type:
        return _.get(action.meta, 'filters') || state;
      default:
        return state;
    }
  };
  const isStaleReducer = (state: boolean = false, action: Action) => {
    switch (action.type){
      case 'ORDER:MARK_LISTS_STALE':
        return true;
      case update_action_type:{
        if (action.meta.page !== 1) return state; //still stale if not fetching first page
        return false;
      }
      default:
        return state;
    }
  };

  return {
    ids: idsReducer,
    total_pages: totalPagesReducer,
    total_count: totalCountReducer,
    next_page: nextPageReducer,
    query: queryReducer,
    filters: filtersReducer,
    is_stale: isStaleReducer
  };
};

export const activeReducers = makeOrderListReducers('ORDER:FETCH_ACTIVE__SUCCESS');
export const allReducers = makeOrderListReducers('ORDER:FETCH_ALL__SUCCESS');
export const completedReducers = makeOrderListReducers('ORDER:FETCH_COMPLETED__SUCCESS');
export const futureReducers = makeOrderListReducers('ORDER:FETCH_FUTURE__SUCCESS');

export type LocalState = {
  by_id: ById,
  all: OrderList,
  active: OrderList,
  completed: OrderList,
  future: OrderList,
  is_fetching: boolean,
  is_updating: boolean
};

const orderReducer = combineReducers({
  by_id: byIdReducer,
  all: combineReducers(allReducers),
  active: combineReducers(activeReducers),
  completed: combineReducers(completedReducers),
  future: combineReducers(futureReducers),
  is_fetching: isFetchingReducer,
  is_updating: isUpdatingReducer
});

export default orderReducer;
