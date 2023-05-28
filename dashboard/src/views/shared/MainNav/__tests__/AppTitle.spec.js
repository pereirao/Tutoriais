import React from 'react';

import AppTitle from '../AppTitle';

it('renders AppTitle correctly', () => {
  expect(shallow(<AppTitle />)).toMatchSnapshot();
});
