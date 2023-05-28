import React from 'react';

import StoreRatingModal from '../StoreRatingModal';

it('renders good correctly', () => {
  expect(shallow(<StoreRatingModal rating="4.9" />)).toMatchSnapshot();
});

it('renders meh correctly', () => {
  expect(shallow(<StoreRatingModal rating="4.6" />)).toMatchSnapshot();
});

it('renders bad correctly', () => {
  expect(shallow(<StoreRatingModal rating="3.1" />)).toMatchSnapshot();
});
