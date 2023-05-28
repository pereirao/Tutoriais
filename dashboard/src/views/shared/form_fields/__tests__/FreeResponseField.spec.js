import React from 'react';

import FreeResponseField from '../FreeResponseField';

it('renders correctly', () => {
  expect(shallow(<FreeResponseField />)).toMatchSnapshot();
});
