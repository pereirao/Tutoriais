// @flow

import {filter, switchMap} from 'rxjs/operators';
import {api} from '../networking';
import createActionsForRequest from '../utils/create_actions_for_request';

export const fetchAdjustments = (action$: Object) => {
    const adjustment_response_action$ = action$
        .pipe(filter(action => action.type === 'ADJUSTMENT:FETCH'),
            switchMap(action => {
                return createActionsForRequest(api.fetchAdjustments(action.payload.order_id), action.type, action.meta);
            })
        );

    return adjustment_response_action$;
};
