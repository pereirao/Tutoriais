// @flow

import _ from 'lodash';
import { combineReducers } from 'redux';
import I18n from '../../localization';
import type { Order } from './index';
import type { Action } from '../store';

type ById = {[id: number]: Order};

export const byIdReducer = (state: ById = {}, action: Action) => {
  switch (action.type){
    case 'NOTIFICATION_METHOD:FETCH__SUCCESS':
      return action.payload.entities.notification_method || {};
    case 'NOTIFICATION_METHOD:CREATE__SUCCESS':
    case 'NOTIFICATION_METHOD:UPDATE__SUCCESS':
      return {...state, ...action.payload.entities.notification_method};
    case 'NOTIFICATION_METHOD:DESTROY__SUCCESS':
      return _.omit(state, action.payload.result);
    default:
      return state;
  }
};

export const allIdsReducer = (state: Array<string> = [], action: Action) => {
  switch (action.type){
    case 'NOTIFICATION_METHOD:FETCH__SUCCESS':
      return _.uniq([...state, ...action.payload.result]);
    case 'NOTIFICATION_METHOD:CREATE__SUCCESS':
      return [...state, action.payload.result];
    case 'NOTIFICATION_METHOD:DESTROY__SUCCESS':
      return _.without(state, action.payload.result);
    default:
      return state;
  }
};

export const isFetchingReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'NOTIFICATION_METHOD:FETCH__LOADING':
      return true;
    case 'NOTIFICATION_METHOD:FETCH__SUCCESS':
    case 'NOTIFICATION_METHOD:FETCH__ERROR':
      return false;
    default:
      return state;
  }
};

export const updatingIdReducer = (state: number = null, action: Action) => {
  switch (action.type){
    case 'NOTIFICATION_METHOD:UPDATE__LOADING':
      return action.meta.id;
    case 'NOTIFICATION_METHOD:UPDATE__SUCCESS':
    case 'NOTIFICATION_METHOD:UPDATE__ERROR':
      return null;
    default:
      return state;
  }
};

export const isCreatingReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'NOTIFICATION_METHOD:CREATE__LOADING':
      return true;
    case 'NOTIFICATION_METHOD:CREATE__SUCCESS':
    case 'NOTIFICATION_METHOD:CREATE__ERROR':
      return false;
    default:
      return state;
  }
};

export const successfullyCreatedReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'NOTIFICATION_METHOD:CREATE__SUCCESS':
      return true;
    case 'NOTIFICATION_METHOD:RESET_NEW_NOTIFICATION_METHOD_FORM':
    case 'NOTIFICATION_METHOD:CREATE__ERROR':
      return false;
    default:
      return state;
  }
};

export const createNotificationMethodErrorsReducer = (state: Array<string> = [], action: Action) => {
  switch (action.type){
    case 'NOTIFICATION_METHOD:CREATE__ERROR':{
      if (action.payload.error === 'Internal Server Error'){
        return [I18n.t('form.error.invalid')];
      } else {
        return state;
      }
    }
    case 'NOTIFICATION_METHOD:RESET_NEW_NOTIFICATION_METHOD_FORM':
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
  create_notification_method_errors: Array<string>,
  successfully_created: boolean
};

const notificationMethodReducer = combineReducers({
  by_id: byIdReducer,
  all_ids: allIdsReducer,
  is_fetching: isFetchingReducer,
  updating_id: updatingIdReducer,
  is_creating: isCreatingReducer,
  create_notification_method_errors: createNotificationMethodErrorsReducer,
  successfully_created: successfullyCreatedReducer
});

export default notificationMethodReducer;
