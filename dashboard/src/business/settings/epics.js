// @flow
import {filter, switchMap} from "rxjs/operators"
import {api} from '../networking';
import createActionsForRequest from '../utils/create_actions_for_request';

export const fetchSettings = (action$: Object) => {
  const report_response_action$ = action$
    .pipe(
      filter(action => action.type === 'SETTINGS:FETCH'),
      switchMap(action => {
        console.log(action)
        return createActionsForRequest(api.fetchSettings(), action.type, action.meta);
      }));

  return report_response_action$;
};
