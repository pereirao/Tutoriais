// @flow

import { combineReducers } from 'redux';
import type { Action } from '../store';
import { openSubstituteModal, closeSubstituteModal } from './actions';

export const orderStateModalIdReducer = (state: string = null, action: Action) => {
  switch (action.type){
    case 'UI:OPEN_ORDER_STATE_MODAL':
      return action.payload.order_id;
    case 'ORDER:UPDATE_ORDER__SUCCESS':
    case 'ORDER:UPDATE_ORDER__ERROR':
    case 'UI:CLOSE_ORDER_STATE_MODAL':
      return null;
    default:
      return state;
  }
};

export const forceRefreshModalReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case 'UI:FORCE_REFRESH':
      return true;
    default:
      return state;
  }
};

export const substituteModalReducer = (state: boolean = false, action: Action) => {
  switch (action.type){
    case openSubstituteModal:
      return true;
    case closeSubstituteModal:
      return false;
    default:
      return state;
  }
};

export type LocalState = {
  order_state_modal_id: string,
  substitute_modal_open: boolean,
  force_refresh_modal_open: boolean
};

const uiReducer = combineReducers({
  order_state_modal_id: orderStateModalIdReducer,
  substitute_modal_open: substituteModalReducer,
  force_refresh_modal_open: forceRefreshModalReducer
});

export default uiReducer;
