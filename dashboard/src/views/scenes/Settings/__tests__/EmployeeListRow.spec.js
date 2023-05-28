import React from 'react';

import { EmployeeListRow } from '../EmployeeListRow';
import { employee_helpers } from '../../../../business/employee';
// import employee_factory from '../../../../business/employee/__tests__/employee.factory';

const { EMPLOYEE_COLUMN_ORDER } = employee_helpers;

const EMPLOYEE = {
  id: 10,
  first_name: 'Jon',
  last_name: 'BonJovi',
  active: true,
  email: 'jbj@minibardelivery.com',
  roles: ['supplier', 'driver']
};

it('renders correctly', () => {
  expect(shallow(<EmployeeListRow
    key={EMPLOYEE.id}
    columns={EMPLOYEE_COLUMN_ORDER}
    employee={EMPLOYEE} />
  )).toMatchSnapshot();
});
