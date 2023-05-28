import React from 'react';
import { EmployeeList } from '../EmployeeList';
import employee_factory from '../../../../business/employee/__tests__/employee.factory';


it('renders correctly', () => {
  expect(shallow(<EmployeeList fetchEmployees={() => null} employees={[employee_factory.build(), employee_factory.build()]} />)).toMatchSnapshot();
});
