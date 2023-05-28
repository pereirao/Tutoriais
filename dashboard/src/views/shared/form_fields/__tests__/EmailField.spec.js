import React from 'react';

import EmailField from '../EmailField';

it('renders correctly', () => {
  expect(shallow(<EmailField />)).toMatchSnapshot();
});
