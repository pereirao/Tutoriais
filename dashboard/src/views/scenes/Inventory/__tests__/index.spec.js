import React from 'react';

import Inventory from '../index';

it('renders correctly', () => {
  expect(shallow(<Inventory />)).toMatchSnapshot();
});
