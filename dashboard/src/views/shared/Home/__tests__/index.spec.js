import React from 'react';

// NOTE: the named export isn't a connected component
import { Home } from '../index';

it('renders when logged_in', () => {
  const stubbed_location = {pathname: '/'};
  expect(shallow(
    <Home
      logged_in
      fetching_me={false}
      location={stubbed_location}
      fetchMe={() => {}} />
  )).toMatchSnapshot();
});

it('get loading view when !logged_in', () => {
  const stubbed_location = {pathname: '/'};
  expect(shallow(
    <Home
      logged_in={false}
      fetching_me={false}
      location={stubbed_location}
      fetchMe={() => {}} />
  )).toMatchSnapshot();
});
