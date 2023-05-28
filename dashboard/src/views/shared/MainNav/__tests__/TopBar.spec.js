import React from 'react';

import TopBar from '../TopBar';

it('renders TopBar correctly', () => {
  expect(shallow(<TopBar />)).toMatchSnapshot();
});
