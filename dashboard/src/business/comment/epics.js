// @flow

import {filter, switchMap} from 'rxjs/operators';
import {api} from '../networking';
import createActionsForRequest from '../utils/create_actions_for_request';

export const fetchComments = (action$: Object) => {
    const comment_response_action$ = action$
        .pipe(
            filter(action => action.type === 'COMMENT:FETCH'),
            switchMap(action => {
                return createActionsForRequest(api.fetchComments(action.payload.order_id), action.type, action.meta);
            })
        );

    return comment_response_action$;
};

export const addComment = (action$: Object) => {
    const comment_response_action$ = action$
        .pipe(
            filter(action => action.type === 'COMMENT:ADD'),
            switchMap(action => {
                return createActionsForRequest(api.addComment(action.payload.order_id, action.payload.body), action.type, action.meta);
            })
        );
    

    return comment_response_action$;
};
