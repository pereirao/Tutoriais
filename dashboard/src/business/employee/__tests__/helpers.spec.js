import { employeeTableRow, driverOptions, isDriver } from '../helpers';
import employee_factory from './employee.factory';

describe('employeeTableRow', () => {
  const employee = employee_factory.build();
  it('returns object containing formatted name, email, roles, and status', () => {
    expect(employeeTableRow(employee)).toEqual({
      full_name: `${employee.first_name} ${employee.last_name}`,
      email: employee.email,
      roles: 'No',
      active: 'Active'
    });
  });
});

describe('driverOptions', () => {
  const employees = [
    employee_factory.build(),
    employee_factory.build('is_driver', {id: 2}),
    employee_factory.build('is_driver', {id: 3, active: false})
  ];
  it('returns option for all active employees with driver role', () => {
    expect(driverOptions(employees)).toEqual([{
      value: 2,
      text: 'Test Employee'
    }]);
  });
});

describe('isDriver', () => {
  const driver = employee_factory.build('is_driver');
  const employee = employee_factory.build();
  it('returns true if employee has driver role', () => {
    expect(isDriver(driver)).toEqual(true);
  });
  it('returns false if the employee does not have a driver role', () => {
    expect(isDriver(employee)).toEqual(false);
  });
});
