// @flow

import { combineReducers } from 'redux';
import _ from 'lodash';
// import I18n from '../../localization';
import type { Order } from './index';
import type { Action } from '../store';

type ById = {[id: number]: Order};

export const byIdReducer = (state: ById = {}, action: Action) => {
  switch (action.type){
    case 'EMPLOYEE:FETCH__SUCCESS':
      return action.payload.entities.employee || {};
    case 'EMPLOYEE:CREATE__SUCCESS':
    case 'EMPLOYEE:UPDATE__SUCCESS':
      return {...state, ...action.payload.entities.employee};
    case 'EMPLOYEE:DESTROY__SUCCESS':
      return _.omit(state, action.payload.result);
    default:
      return state;
  }
};

export const allIdsReducer = (state: Array<string> = [], action: Action) => {
  switch (action.type){
    case 'EMPLOYEE:FETCH__SUCCESS':
      return _.uniq([...state, ...action.payload.result]);
    case 'EMPLOYEE:CREATE__SUCCESS':
      return [...state, action.payload.result];
    case 'EMPLOYEE:DESTROY__SUCCESS':
      return action.payload.result;
    default:
      return state;
  }
};

export const isFetchingReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'EMPLOYEE:FETCH__LOADING':
      return true;
    case 'EMPLOYEE:FETCH__SUCCESS':
    case 'EMPLOYEE:FETCH__ERROR':
      return false;
    default:
      return state;
  }
};

export const updatingIdReducer = (state: number = null, action: Action) => {
  switch (action.type){
    case 'EMPLOYEE:UPDATE__LOADING':
      return action.meta.id;
    case 'EMPLOYEE:UPDATE__SUCCESS':
    case 'EMPLOYEE:UPDATE__ERROR':
      return null;
    default:
      return state;
  }
};

export const isCreatingReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'EMPLOYEE:CREATE__LOADING':
      return true;
    case 'EMPLOYEE:CREATE__SUCCESS':
    case 'EMPLOYEE:CREATE__ERROR':
      return false;
    default:
      return state;
  }
};

export const successfullyCreatedReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'EMPLOYEE:CREATE__SUCCESS':
      return true;
    case 'EMPLOYEE:RESET_NEW_EMPLOYEE_FORM':
    case 'EMPLOYEE:CREATE__ERROR':
      return false;
    default:
      return state;
  }
};

export const createEmployeeErrorsReducer = (state: Array<string> = [], action: Action) => {
  switch (action.type){
    case 'EMPLOYEE:CREATE__ERROR':
      return action.payload.error;
    case 'EMPLOYEE:RESET_NEW_EMPLOYEE_FORM':
      return [];
    default:
      return state;
  }
};

export type LocalState = {
  by_id: ById,
  all_ids: Array<string>,
  is_fetching: boolean,
  updating_id: number,
  is_creating: boolean,
  create_employee_errors: Array<string>,
  successfully_created: boolean
};

const employeeReducer = combineReducers({
  by_id: byIdReducer,
  all_ids: allIdsReducer,
  is_fetching: isFetchingReducer,
  updating_id: updatingIdReducer,
  is_creating: isCreatingReducer,
  create_employee_errors: createEmployeeErrorsReducer,
  successfully_created: successfullyCreatedReducer
});

export default employeeReducer;
