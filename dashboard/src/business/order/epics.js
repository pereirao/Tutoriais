// @flow

import {filter, mergeMap, switchMap} from 'rxjs/operators';
import {api} from '../networking';
import createActionsForRequest from '../utils/create_actions_for_request';

export const fetchAll = (action$: Object) => {
    const order_response_action$ = action$
        .pipe(
            filter(action => action.type === 'ORDER:FETCH_ALL'),
            switchMap(action => {
                return createActionsForRequest(api.fetchAllOrders(action.meta), action.type, action.meta);
            })
        );

    return order_response_action$;
};

export const fetchOrder = (action$: Object) => {
    const order_response_action$ = action$
        .pipe(
            filter(action => action.type === 'ORDER:FETCH_ORDER'),
            mergeMap(action => {
                return createActionsForRequest(api.fetchOrder(action.payload.order_id), action.type, action.meta);
            })
        );

    return order_response_action$;
};

export const updateOrder = (action$: Object) => {
    const order_response_action$ = action$
        .pipe(
            filter(action => action.type === 'ORDER:UPDATE_ORDER'),
            switchMap(action => {
                return createActionsForRequest(api.updateOrder(action.payload.order_id, action.payload.params), action.type, action.meta);
            })
        );

    return order_response_action$;
};

export const fetchActive = (action$: Object) => {
    const order_response_action$ = action$
        .pipe(
            filter(action => action.type === 'ORDER:FETCH_ACTIVE'),
            switchMap(action => {
                const meta_defaulted = {page: 1, ...action.meta};
                return createActionsForRequest(api.fetchActiveOrders(action.meta), 'ORDER:FETCH_ACTIVE', meta_defaulted);
            }));

    return order_response_action$;
};

export const fetchCompleted = (action$: Object) => {
    const order_response_action$ = action$
        .pipe(
            filter(action => action.type === 'ORDER:FETCH_COMPLETED'),
            switchMap(action => {
                return createActionsForRequest(api.fetchCompletedOrders(action.meta), action.type, action.meta);
            }));

    return order_response_action$;
};

export const fetchFuture = (action$: Object) => {
    const order_response_action$ = action$
        .pipe(
            filter(action => action.type === 'ORDER:FETCH_FUTURE'),
            switchMap(action => {
                return createActionsForRequest(api.fetchFutureOrders(action.meta), action.type, action.meta);
            })
        );

    return order_response_action$;
};
