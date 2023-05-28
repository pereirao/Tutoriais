import React from 'react';

import Settings from '../index';

it('renders correctly', () => {
  expect(shallow(<Settings />)).toMatchSnapshot();
});
