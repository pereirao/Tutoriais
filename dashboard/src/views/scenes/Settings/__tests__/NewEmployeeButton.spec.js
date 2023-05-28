import React from 'react';
// NOTE: the named export isn't a connected component
import { NewEmployeeButton } from '../NewEmployeeButton';

it('renders correctly', () => {
  expect(shallow(<NewEmployeeButton />)).toMatchSnapshot();
});
