// @flow

import _ from 'lodash';
import { combineReducers } from 'redux';
import type { Variant } from './index';
import type { Action } from '../store';

type ById = {[id: string]: Variant};

export const byIdReducer = (state: ById = {}, action: Action) => {
  switch (action.type){
    case 'VARIANT:FETCH__SUCCESS':{
      if (action.meta.page === 1){
        return {...state, ...(action.payload.entities.variant || {})};
      } else {
        return {...state, ...action.payload.entities.variant};
      }
    }
    case 'VARIANT:UPDATE__SUCCESS':
      return {...state, ...action.payload.entities.variant};
    default:
      return state;
  }
};

export const listIdsReducer = (state: Array<string> = [], action: Action) => {
  switch (action.type){
    case 'VARIANT:FETCH__SUCCESS':{
      if (action.meta.page === 1) return action.payload.result.variants;
      return _.uniq([...state, ...action.payload.result.variants]);
    }
    default:
      return state;
  }
};
export const totalCountReducer = (state: number = 0, action: Action) => {
  switch (action.type){
    case 'VARIANT:FETCH__SUCCESS':
      return action.payload.result.total_count;
    default:
      return state;
  }
};
export const totalPagesReducer = (state: number = 1, action: Action) => {
  switch (action.type){
    case 'VARIANT:FETCH__SUCCESS':
      return action.payload.result.total_pages;
    default:
      return state;
  }
};
export const nextPageReducer = (state: number = 1, action: Action) => {
  switch (action.type){
    case 'VARIANT:FETCH__SUCCESS':
      return action.payload.result.total_count === 0 ? action.meta.page : action.meta.page + 1;
    default:
      return state;
  }
};
export const queryReducer = (state: string = '', action: Action) => {
  switch (action.type){
    case 'VARIANT:FETCH__SUCCESS':
      return _.get(action.meta, 'query') || '';
    default:
      return state;
  }
};
export const filtersReducer = (state: OrderFilters = {}, action: Action) => {
  switch (action.type){
    case 'VARIANT:FETCH__SUCCESS':{
      const stock_filter = _.get(action.meta, 'in_stock');
      return stock_filter !== null ? {in_stock: stock_filter} : {};
    }
    default:
      return state;
  }
};

export const isFetchingReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'VARIANT:FETCH__LOADING':
      return true;
    case 'VARIANT:FETCH__SUCCESS':
    case 'VARIANT:FETCH__ERROR':
      return false;
    default:
      return state;
  }
};

export const isUpdatingReducer = (state: number = null, action: Action) => {
  switch (action.type){
    case 'VARIANT:UPDATE__LOADING':
      return action.meta.id;
    case 'VARIANT:UPDATE__SUCCESS':
    case 'VARIANT:UPDATE__ERROR':
      return null;
    default:
      return state;
  }
};

export type LocalState = {
  by_id: ById,
  list_ids: Array<string>,
  total_pages: number,
  total_count: number,
  next_page: number,
  query: string,
  filters: Object,
  is_fetching: boolean,
  is_updating: number
};

const variantReducer = combineReducers({
  by_id: byIdReducer,
  list_ids: listIdsReducer,
  total_pages: totalPagesReducer,
  total_count: totalCountReducer,
  next_page: nextPageReducer,
  query: queryReducer,
  filters: filtersReducer,
  is_fetching: isFetchingReducer,
  is_updating: isUpdatingReducer
});

export default variantReducer;
