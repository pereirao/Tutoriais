// @flow

type EmployeeRole = 'supplier' | 'driver';

export type Employee = {
  id: number,
  first_name: string,
  last_name: string,
  active: boolean,
  email: string,
  roles: Array<EmployeeRole>
};

export * as employee_epics from './epics';
export * as employee_actions from './actions';
export * as employee_helpers from './helpers';
export { default as employeeReducer } from './reducer';
export { default as employee_selectors } from './selectors';
