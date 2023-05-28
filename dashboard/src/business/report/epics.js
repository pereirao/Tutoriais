// @flow

import {interval} from 'rxjs';
import {filter, switchMap, take} from 'rxjs/operators';
import _ from 'lodash';
import {api} from '../networking';
import createActionsForRequest from '../utils/create_actions_for_request';

export const fetchReports = (action$: Object) => {
  const report_response_action$ = action$
    .pipe(
      filter(action => action.type === 'REPORT:FETCH'),
      switchMap(action => {
        return createActionsForRequest(api.fetchReports(), action.type, action.meta);
      }));

  return report_response_action$;
};

const POLLING_INTERVAL = 3 * 1000;
const POLLING_ATTEMPTS = 10;
export const pollReports = (action$: Object) => {
  const report_response_action$ = action$
    .pipe(
      filter(action => action.type === 'REPORT:CREATE__SUCCESS'),
      switchMap(action => {
        const report_poll$ =
          // Setup polling interval with cap on number of requests
          interval(POLLING_INTERVAL)
            .pipe(
              take(POLLING_ATTEMPTS),
              // Refetch the entire list of reports
              switchMap(() => api.fetchReports()),// Short circuit polling when we recieve the created report with a 'completed' state
              filter(response => _.get(response, `entities.report.${action.payload.result}.state`) === 'completed'),
              take(1)
            )
        // Creates actions for entire polling cycle instead of request
        return createActionsForRequest(report_poll$, 'REPORT:POLL');
      }));

  return report_response_action$;
};


export const createReport = (action$: Object) => {
  const report_response_action$ = action$
    .pipe(
      filter(action => action.type === 'REPORT:CREATE'),
      switchMap(action => {
        return createActionsForRequest(api.createReport(action.payload), action.type, action.meta);
      }));
  return report_response_action$;
};

