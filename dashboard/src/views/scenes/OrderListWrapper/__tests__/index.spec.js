import React from 'react';
// NOTE: named import is not connected component
import { OrderListWrapper } from '../index';

it('renders correctly', () => {
  expect(shallow(<OrderListWrapper location={{pathname: '/'}} />)).toMatchSnapshot();
});
