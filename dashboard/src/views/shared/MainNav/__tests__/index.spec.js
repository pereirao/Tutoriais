import React from 'react';

// NOTE: not the connected one
import { MainNav } from '../index';

it('renders correctly', () => {
  const stubbed_location = {pathname: '/'};
  expect(
    shallow(<MainNav location={stubbed_location} ping={() => {}} />)
  ).toMatchSnapshot();
});
