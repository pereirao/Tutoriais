import React from 'react';

import SearchInput from '../index';

it('renders correctly', () => {
  expect(
    shallow(<SearchInput query="Budweiser Light" />)
  ).toMatchSnapshot();
});
