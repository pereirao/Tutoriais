import React from 'react';
import NewEmployeeModal from '../NewEmployeeModal';

it('renders correctly', () => {
  expect(shallow(<NewEmployeeModal />)).toMatchSnapshot();
});
