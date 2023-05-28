import React from 'react';

// NOTE: the named export isn't a connected component
import { OrderComments } from '../OrderComments';

it('renders correctly', () => {
  expect(shallow(
    <OrderComments />
  )).toMatchSnapshot();
});
