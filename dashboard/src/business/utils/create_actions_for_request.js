//@flow

import {concat, from, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import _ from 'lodash';

/*
  This utility provides a helper which generates subactions for our network request lifecycle.
  The actions are based on an approach discussed in the redux docs here: http://redux.js.org/docs/advanced/AsyncActions.html,
  and conform to the flux standard action spec: (https://github.com/acdlite/flux-standard-action).

  This helper also guarantees that the loading action will always be fired before the success/error action.
*/

type Request = Object; // TODO: promise or observable
const createActionsForRequest = (request: Request, action_base: string, meta: ?Object) => {
  if (!request) throw new Error('Invalid Request: none specified');
  if (!action_base || !_.isString(action_base)) throw new Error('Invalid action_base');

  const loadingAction = makeLoadingAction(action_base);
  const successAction = makeSuccessAction(action_base);
  const errorAction = makeErrorAction(action_base);
  const doneAction = makeDoneAction(action_base);

  const loading_action$ = of(loadingAction(meta));
  const response_action$ = from(request) // from allows request to be a promise or an observable, if we need more complex behavior
    .pipe(
      map(response => successAction(response, meta)),
      catchError(error_response => of(errorAction(error_response, meta)))
    );
  const done_action$ = of(doneAction(meta));

  return concat(loading_action$, response_action$, done_action$);
};

export const makeLoadingAction = (action_base: string) => (meta: ?Object): Action => ({
  type: `${action_base}__LOADING`,
  meta
});
export const makeSuccessAction = (action_base: string) => (response: Object, meta: ?Object): Action => ({
  type: `${action_base}__SUCCESS`,
  payload: response,
  meta
});
export const makeErrorAction = (action_base: string) => (response: Object, meta: ?Object): Action => ({
  type: `${action_base}__ERROR`,
  payload: response,
  error: true,
  meta
});
export const makeDoneAction = (action_base: string) => (meta: ?Object): Action => ({
  type: `${action_base}__DONE`,
  meta
});

export default createActionsForRequest;
