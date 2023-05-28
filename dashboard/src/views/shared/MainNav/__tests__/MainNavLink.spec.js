import React from 'react';

import MainNavLink from '../MainNavLink';

it('renders correctly', () => {
  expect(shallow(<MainNavLink route_name="reports" current_path="/orders" />)).toMatchSnapshot();
});
