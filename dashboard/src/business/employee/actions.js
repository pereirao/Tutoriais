// @flow

import type { Action } from '../store';

export const destroyEmployee = (employee_id: number): Action => ({
  type: 'EMPLOYEE:DESTROY',
  payload: { employee_id }
});

export const createEmployee = (data): Action => ({
  type: 'EMPLOYEE:CREATE',
  payload: data,
  meta: {}
});

export const fetchEmployees = (employee_ids: Array<number>, options: Object): Action => ({
  type: 'EMPLOYEE:FETCH',
  payload: {
    employee_ids
  },
  meta: {
    options
  }
});

export const updateEmployee = (data): Action => ({
  type: 'EMPLOYEE:UPDATE',
  payload: data,
  meta: { id: data.id }
});

export const resetNewEmployeeForm = (data): Action => ({
  type: 'EMPLOYEE:RESET_NEW_EMPLOYEE_FORM',
  payload: data
});
