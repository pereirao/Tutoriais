// @flow

import {filter, switchMap} from 'rxjs/operators';
import {api} from '../networking';
import createActionsForRequest from '../utils/create_actions_for_request';

export const createNotificationMethod = (action$: Object) => {
  const notification_method_response_action$ = action$
    .pipe(
      filter(action => action.type === 'NOTIFICATION_METHOD:CREATE'),
      switchMap(action => {
        return createActionsForRequest(api.createNotificationMethod({...action.payload}), action.type, action.meta);
      }));

  return notification_method_response_action$;
};

export const destroyNotificationMethod = (action$: Object) => {
  const notification_method_response_action$ = action$
    .pipe(
      filter(action => action.type === 'NOTIFICATION_METHOD:DESTROY'),
      switchMap(action => {
        return createActionsForRequest(api.destroyNotificationMethod(action.payload), action.type, action.meta);
      }));

  return notification_method_response_action$;
};

export const fetchNotificationMethods = (action$: Object) => {
  const notification_method_response_action$ = action$
    .pipe(
      filter(action => action.type === 'NOTIFICATION_METHOD:FETCH'),
      switchMap(action => {
        return createActionsForRequest(api.fetchNotificationMethods(), action.type, action.meta);
      }));

  return notification_method_response_action$;
};

export const updateNotificationMethod = (action$: Object) => {
  const notification_method_response_action$ = action$
    .pipe(
      filter(action => action.type === 'NOTIFICATION_METHOD:UPDATE'),
      switchMap(action => {
        return createActionsForRequest(api.updateNotificationMethod(action.payload), action.type, action.meta);
      }));

  return notification_method_response_action$;
};
