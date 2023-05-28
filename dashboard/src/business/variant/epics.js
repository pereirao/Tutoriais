// @flow

import {filter, mergeMap, switchMap} from 'rxjs/operators';
import {api} from '../networking';
import createActionsForRequest from '../utils/create_actions_for_request';

export const createVariant = (action$: Object) => {
  const variant_response_action$ = action$
    .pipe(
      filter(action => action.type === 'VARIANT:CREATE'),
      switchMap(action => {
        return createActionsForRequest(api.createVariant({...action.payload}), action.type, action.meta);
      }));

  return variant_response_action$;
};

export const fetchVariants = (action$: Object) => {
  const variant_response_action$ = action$
    .pipe(
      filter(action => action.type === 'VARIANT:FETCH'),
      switchMap(action => {
        return createActionsForRequest(api.fetchVariants({...action.meta}), action.type, action.meta);
      }));

  return variant_response_action$;
};

export const updateVariant = (action$: Object) => {
  const variant_response_action$ = action$
    .pipe(
      filter(action => action.type === 'VARIANT:UPDATE'),
      mergeMap(action => {
        return createActionsForRequest(api.updateVariant({...action.payload}), action.type, action.meta);
      }));

  return variant_response_action$;
};
