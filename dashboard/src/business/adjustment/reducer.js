//@flow

import { combineReducers } from 'redux';
import type { Adjustment } from './index';
import type { Action } from '../store';

type ById = {[id: string]: Adjustment};

export const byIdReducer = (state: ById = {}, action: Action) => {
  switch (action.type){
    case 'ADJUSTMENT:FETCH__SUCCESS':
      return { ...state, ...action.payload.entities.adjustment };
    default:
      return state;
  }
};

export const isFetchingReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'ADJUSTMENT:FETCH__LOADING':
      return true;
    case 'ADJUSTMENT:FETCH__SUCCESS':
    case 'ADJUSTMENT:FETCH__ERROR':
      return false;
    default:
      return state;
  }
};

export type LocalState = {
  by_id: ById,
  is_fetching: boolean
};

const adjustmentReducer = combineReducers({
  by_id: byIdReducer,
  is_fetching: isFetchingReducer
});

export default adjustmentReducer;
