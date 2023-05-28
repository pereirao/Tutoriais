// @flow

import {filter, switchMap} from 'rxjs/operators';
import {api} from '../networking';
import createActionsForRequest from '../utils/create_actions_for_request';

export const createEmployee = (action$: Object) => {
  const employee_response_action$ = action$
    .pipe(
      filter(action => action.type === 'EMPLOYEE:CREATE'),
      switchMap(action => {
        return createActionsForRequest(api.createEmployee({...action.payload}), action.type, action.meta);
      }));

  return employee_response_action$;
};

export const fetchEmployees = (action$: Object) => {
  const employee_response_action$ = action$
    .pipe(filter(action => action.type === 'EMPLOYEE:FETCH'),
      switchMap(action => {
        return createActionsForRequest(api.fetchEmployees(), action.type, action.meta);
      }));

  return employee_response_action$;
};

export const updateEmployee = (action$: Object) => {
  const employee_response_action$ = action$
    .pipe(
      filter(action => action.type === 'EMPLOYEE:UPDATE'),
      switchMap(action => {
        return createActionsForRequest(api.updateEmployee({...action.payload}), action.type, action.meta);
      }));

  return employee_response_action$;
};

export const destroyEmployee = (action$: Object) => {
  const employee_response_action$ = action$
    .pipe(
      filter(action => action.type === 'EMPLOYEE:DESTROY'),
      switchMap(action => {
        return createActionsForRequest(api.destroyEmployee(action.payload), action.type, action.meta);
      }));

  return employee_response_action$;
};
