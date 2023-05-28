// @flow

import {of, concat} from 'rxjs';
import { order_actions } from '../order';
import { comment_actions } from '../comment';
import { adjustment_actions } from '../adjustment';
import { ui_actions } from '../ui';
import { version } from '../../../package.json';

// TODO: decide if batching is necessary

type Notification = Object; // TODO: promise or observable
const createActionForSocket = (data: Notification, location, my_email) => {
  switch (data.entity_type){
    case 'Shipment':
      return makeFetchAction(data.notification_type, data.entity_id, location, my_email);
    case 'App':
      return makeAppAction(data.notification_type, data.entity_id);
    default:
      return () => {}; // do nothing if unrecognized entity_type
  }
};

export const makeFetchAction = (notification_type, entity_id: string, location: Object, my_email: string) => {
  switch (notification_type){
    case 'fetch':{
      const mark_stale_action$ = of(order_actions.markListsStale());
      const fetch_action$ = of(order_actions.fetchOrder(entity_id, {notify: true}));
      return concat(mark_stale_action$, fetch_action$);
    }
    case 'fetch_comment':{
      const order_action$ = of(order_actions.fetchOrder(entity_id));
      const comment_action$ = of(comment_actions.fetchComments(entity_id, {
        my_email,
        from_order_detail: location.includes(entity_id)
      }));
      return concat(order_action$, comment_action$);
    }
    case 'fetch_adjustment':{
      const order_action$ = of(order_actions.fetchOrder(entity_id));
      const adjustment_action$ = of(adjustment_actions.fetchAdjustments(entity_id));
      return concat(order_action$, adjustment_action$);
    }
    default:
      return () => {}; // do nothing if unrecognized notification_type
  }
};

export const makeAppAction = (notification_type, newest_app_version) => {
  if (notification_type === 'prompt_update' && version !== newest_app_version){
    return of(ui_actions.forceRefresh());
  }
  return () => {}; // do nothing if unrecognized notification_type
};

export default createActionForSocket;
