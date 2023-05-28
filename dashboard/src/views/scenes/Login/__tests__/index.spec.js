import React from 'react';

import { Login } from '../index';

it('renders correctly', () => {
  expect(shallow(<Login is_logged_in={false} />)).toMatchSnapshot();
});
