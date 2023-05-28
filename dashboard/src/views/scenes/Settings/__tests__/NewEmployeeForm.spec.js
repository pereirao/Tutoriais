import React from 'react';
import { NewEmployeeForm } from '../NewEmployeeForm';

it('renders correctly', () => {
  expect(shallow(<NewEmployeeForm createEmployee={() => null} />)).toMatchSnapshot();
});
