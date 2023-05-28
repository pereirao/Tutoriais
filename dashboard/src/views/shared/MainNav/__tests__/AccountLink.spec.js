import React from 'react';

import { AccountLink } from '../AccountLink';

it('renders AccountLink correctly', () => {
  expect(shallow(<AccountLink name="Tim Jacklepappy" />)).toMatchSnapshot();
});
