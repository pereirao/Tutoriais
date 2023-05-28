// @flow

import type { Employee } from './index';

export const EMPLOYEE_COLUMN_ORDER = ['mobile_summary', 'full_name', 'email', 'roles', 'active', 'edit'];
export const EMPLOYEE_EDIT_COLUMN_ORDER = ['mobile_summary', 'first_name', 'last_name', 'email', 'roles', 'active', 'edit'];

export const employeeTableRow = (employee: Employee) => ({
  full_name: `${employee.first_name} ${employee.last_name}`,
  email: employee.email,
  roles: employee.roles.includes('driver') ? 'Yes' : 'No',
  active: employee.active ? 'Active' : 'Inactive'
});

export const driverOptions = (employees: Array<Employee>) => (
  employees.filter(isDriver).filter(d => d.active)
    .map(driver => ({value: driver.id, text: `${driver.first_name} ${driver.last_name}`}))
);

export const driverName = (employee: Employee) => {
  return `${employee.first_name} ${employee.last_name}`;
};

export const isDriver = (employee: Employee) => employee.roles.includes('driver');
