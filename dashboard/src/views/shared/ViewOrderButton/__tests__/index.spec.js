import React from 'react';

// NOTE: the named export isn't a connected component
import { ViewOrderButton } from '../index';

it('renders inline correctly', () => {
  expect(shallow(<ViewOrderButton inline order_id={1} />)).toMatchSnapshot();
});
it('renders non-inline correctly', () => {
  expect(shallow(<ViewOrderButton inline={false} order_id={1} />)).toMatchSnapshot();
});
