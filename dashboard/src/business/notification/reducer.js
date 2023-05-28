//@flow

import { combineReducers } from 'redux';
import _ from 'lodash';
import { order_helpers } from '../order';
import { comment_helpers } from '../comment';
import type { Notification } from './index';
import type { Action } from '../store';

const { isUnconfirmed, isCanceled } = order_helpers;
const { commentNotification } = comment_helpers;

type ById = {[id: string]: Notification};

export const byIdReducer = (state: ById = {}, action: Action) => {
  switch (action.type){
    case 'NOTIFICATION:PUSH':{
      const { id, order_id, notification_type } = action.payload;
      return { ...state, [id]: {id, order_id, notification_type} };
    }
    case 'SESSION:PING__SUCCESS':{
      const unconfirmed_orders = action.payload.unconfirmed_shipments.map(shipment_id => {
        const id = `unconfirmed_${shipment_id}`;
        return { id, order_id: shipment_id, notification_type: 'unconfirmed' };
      });
      return {...state, ..._.keyBy(unconfirmed_orders, 'id')};
    }
    case 'ORDER:FETCH_ORDER__SUCCESS':
    case 'ORDER:UPDATE_ORDER__SUCCESS':{
      const order = _.values(action.payload.entities.order)[0];
      if (isUnconfirmed(order)){
        const id = `unconfirmed_${order.id}`;
        return { ...state, [id]: { id, order_id: order.id, notification_type: 'unconfirmed' } };
      } else if (isCanceled(order) && _.get(action.meta, 'notify')){
        const id = `canceled_${order.id}`;
        return { ...state, [id]: { id, order_id: order.id, notification_type: 'canceled' } };
      }
      return _.omit(state, order.id);
    }
    case 'COMMENT:FETCH__SUCCESS':{
      if (action.meta.from_order_detail) return state; // don't notify for comments fetched while on that order detail screen
      if (_.get(action.payload.entities.comment, 'author.email') === action.meta.my_email){
        return state; // don't notify for comments added by "me"
      }
      const comment_notification = commentNotification(action.payload.entities.comment, action.meta.order_id);
      return { ...state, [comment_notification.id]: comment_notification};
    }
    case 'NOTIFICATION:REMOVE':
      return _.omit(state, action.payload.notification_id);
    default:
      return state;
  }
};

export const displayOrderReducer = (state: Array<string> = [], action: Action) => {
  switch (action.type){
    case 'NOTIFICATION:PUSH':
      return [
        ...state,
        action.payload.id
      ];
    case 'SESSION:PING__SUCCESS':{
      const unconfirmed_ids = action.payload.unconfirmed_shipments.map(shipment_id => `unconfirmed_${shipment_id}`);
      const cleaned_prev_state = state.filter(notification_id => (
        unconfirmed_ids.includes(notification_id) || !notification_id.startsWith('unconfirmed') // remove stale unconfirmed notifications 
      ));
      return _.uniq([...cleaned_prev_state, ...unconfirmed_ids]);
    }
    case 'ORDER:FETCH_ORDER__SUCCESS':
    case 'ORDER:UPDATE_ORDER__SUCCESS':{
      const order = _.values(action.payload.entities.order)[0];
      if (isUnconfirmed(order)){
        const notification_id = `unconfirmed_${action.payload.result}`;
        return _.uniq([...state, notification_id]);// if unconfirmed append to end if new, otherwise do nothing
      } else if (isCanceled(order) && _.get(action.meta, 'notify')){
        const notification_id = `canceled_${action.payload.result}`;
        return _.uniq([..._.without(state, `unconfirmed_${action.payload.result}`), notification_id]);
      } else {
        return _.without(state, `unconfirmed_${action.payload.result}`); // if there isn't a notification after update remove if present
      }
    }
    case 'COMMENT:FETCH__SUCCESS':{
      if (action.meta.from_order_detail) return state; // don't notify for comments fetched while on that order detail screen
      return [...state, commentNotification(action.payload.entities.comment, action.meta.order_id).id];
    }
    case 'NOTIFICATION:REMOVE':
      return _.without(state, action.payload.notification_id);
    default:
      return state;
  }
};

export type LocalState = {
  by_id: ById,
  display_order: Array<string>
};

const notificationReducer = combineReducers({
  by_id: byIdReducer,
  display_order: displayOrderReducer
});

export default notificationReducer;
