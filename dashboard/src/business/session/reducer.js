// @flow

import { combineReducers } from 'redux';
import I18n from '../../localization';
import { READY_STATUS, LOADING_STATUS, SUCCESS_STATUS, ERROR_STATUS } from '../utils/fetch_status';
import type { FetchStatus } from '../utils/fetch_status';
import type { Action } from '../store';
import type { Me } from './index';

export const POLLING_INTERVALS = {
  short: process.env.POLLING_INTERVAL_SHORT || 60000, // 1 min
  medium: process.env.POLLING_INTERVAL_MEDIUM || 120000, // 2 min
  long: process.env.POLLING_INTERVAL_LONG || 300000 // 5 min
};

export const meReducer = (state: Me = null, action: Action) => {
  switch (action.type){
    case 'SESSION:FETCH_ME__SUCCESS':
      return action.payload;
    case 'SESSION:SIGN_OUT':
      return null;
    case 'SESSION:TAKE_BREAK__SUCCESS':
    case 'SESSION:RESUME_WORK__SUCCESS':
    case 'SESSION:CHANGE_DELIVERY_EXPECTATION__SUCCESS':
      return {
        ...state,
        supplier: action.payload
      };
    default:
      return state;
  }
};

export const isLoggingInReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'SESSION:AUTHENTICATE__LOADING':
      return true;
    case 'SESSION:FETCH_ME__SUCCESS':
    case 'SESSION:FETCH_ME__ERROR':
      return false;
    default:
      return state;
  }
};

export const loginErrorReducer = (state: string = '', action: Action) => {
  switch (action.type){
    case 'SESSION:FETCH_ME__ERROR': // TODO: differentiate error from auth validation error
      return I18n.t('system.network_error.incorrect_credentials');
    case 'SESSION:CLEAR_LOGIN_ERROR':
      return '';
    default:
      return state;
  }
};

export const isFetchingMeReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'SESSION:FETCH_ME__LOADING':
      return true;
    case 'SESSION:FETCH_ME__SUCCESS':
    case 'SESSION:FETCH_ME__ERROR':
      return false;
    default:
      return state;
  }
};

export const helpMessageStatusReducer = (state: FetchStatus = READY_STATUS, action: Action) => {
  switch (action.type){
    case 'SESSION:SEND_FOR_HELP__LOADING':
    case 'SESSION:TAKE_BREAK__LOADING':
    case 'SESSION:CHANGE_DELIVERY_EXPECTATION__LOADING':
      return LOADING_STATUS;
    case 'SESSION:SEND_FOR_HELP__SUCCESS':
    case 'SESSION:TAKE_BREAK__SUCCESS':
    case 'SESSION:CHANGE_DELIVERY_EXPECTATION__SUCCESS':
      return SUCCESS_STATUS;
    case 'SESSION:SEND_FOR_HELP__ERROR':
    case 'SESSION:TAKE_BREAK__ERROR':
    case 'SESSION:CHANGE_DELIVERY_EXPECTATION__ERROR':
      return ERROR_STATUS;
    case 'SESSION:SEND_FOR_HELP__DONE':
    case 'SESSION:TAKE_BREAK__DONE':
    case 'SESSION:CHANGE_DELIVERY_EXPECTATION__DONE':
      return READY_STATUS;
    default:
      return state;
  }
};

export const unconfirmedCountReducer = (state: number = null, action: Action) => {
  switch (action.type){
    case 'SESSION:PING__SUCCESS':
      return action.payload.unconfirmed_shipments.length;
    default:
      return state;
  }
};

export const pollingIntervalLengthReducer = (state: number = POLLING_INTERVALS.long, action: Action) => {
  switch (action.type){
    case 'SESSION:SET_POLLING_INTERVAL':
      return action.payload.interval_length;
    default:
      return state;
  }
};

export type LocalState = {
  is_fetching_me: boolean,
  is_logging_in: boolean,
  login_error: string,
  me: Me,
  help_message_status: FetchStatus,
  polling_interval_length: number,
  unconfirmed_count: number
};

const sessionReducer = combineReducers({
  is_fetching_me: isFetchingMeReducer,
  is_logging_in: isLoggingInReducer,
  login_error: loginErrorReducer,
  me: meReducer,
  help_message_status: helpMessageStatusReducer,
  polling_interval_length: pollingIntervalLengthReducer,
  unconfirmed_count: unconfirmedCountReducer
});

export default sessionReducer;
