import React from 'react';

import { StoreRating } from '../StoreRating';

it('renders good correctly', () => {
  expect(shallow(<StoreRating rating="4.9" />)).toMatchSnapshot();
});

it('renders meh correctly', () => {
  expect(shallow(<StoreRating rating="4.6" />)).toMatchSnapshot();
});

it('renders bad correctly', () => {
  expect(shallow(<StoreRating rating="3.1" />)).toMatchSnapshot();
});
