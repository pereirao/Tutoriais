// @flow

import { combineReducers } from 'redux';
import type { Report } from './index';
import type { Action } from '../store';

type ById = {[id: number]: Report};

export const byIdReducer = (state: ById = {}, action: Action) => {
  switch (action.type){
    case 'REPORT:FETCH__SUCCESS':
    case 'REPORT:POLL__SUCCESS':
      return {...state, ...(action.payload.entities.report || {})};
    case 'REPORT:CREATE__SUCCESS':
      return { ...action.payload.entities.report, ...state };
    default:
      return state;
  }
};

export const allIdsReducer = (state: Array<string> = [], action: Action) => {
  switch (action.type){
    case 'REPORT:FETCH__SUCCESS':
    case 'REPORT:POLL__SUCCESS':
      return action.payload.result;
    case 'REPORT:CREATE__SUCCESS':
      return [action.payload.result, ...state];
    default:
      return state;
  }
};

export type LocalState = {
  by_id: ById,
  all_ids: Array<string>
};

const reportReducer = combineReducers({
  by_id: byIdReducer,
  all_ids: allIdsReducer
});

export default reportReducer;
