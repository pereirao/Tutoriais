//@flow

import { combineReducers } from 'redux';
import type { Comment } from './index';
import type { Action } from '../store';

type ById = {[id: string]: Comment};

export const byIdReducer = (state: ById = {}, action: Action) => {
  switch (action.type){
    case 'COMMENT:FETCH__SUCCESS':
    case 'COMMENT:ADD__SUCCESS':
      return { ...state, ...action.payload.entities.comment };
    default:
      return state;
  }
};

export const isFetchingReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'COMMENT:FETCH__LOADING':
    case 'COMMENT:ADD__LOADING':
      return true;
    case 'COMMENT:FETCH__SUCCESS':
    case 'COMMENT:ADD__SUCCESS':
    case 'COMMENT:FETCH__ERROR':
    case 'COMMENT:ADD__ERROR':
      return false;
    default:
      return state;
  }
};

export type LocalState = {
  by_id: ById,
  is_fetching: boolean
};

const commentReducer = combineReducers({
  by_id: byIdReducer,
  is_fetching: isFetchingReducer
});

export default commentReducer;
