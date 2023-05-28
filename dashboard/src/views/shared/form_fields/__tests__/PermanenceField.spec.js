import React from 'react';

import PermanenceField from '../PermanenceField';

it('renders correctly', () => {
  expect(shallow(<PermanenceField />)).toMatchSnapshot();
});
