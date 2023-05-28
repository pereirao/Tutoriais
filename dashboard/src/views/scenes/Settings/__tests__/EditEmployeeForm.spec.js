import React from 'react';
import { EditEmployeeForm } from '../EditEmployeeForm';
import employee_factory from '../../../../business/employee/__tests__/employee.factory';


it('renders correctly', () => {
  expect(shallow(<EditEmployeeForm employee={employee_factory.build()} />)).toMatchSnapshot();
});
