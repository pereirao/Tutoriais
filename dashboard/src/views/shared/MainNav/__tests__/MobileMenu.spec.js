import React from 'react';

// NOTE: named import is not connected to redux
import { MobileMenu } from '../MobileMenu';

it('renders MobileMenu correctly', () => {
  expect(shallow(<MobileMenu hidden={false} current_path="/" />)).toMatchSnapshot();
});
