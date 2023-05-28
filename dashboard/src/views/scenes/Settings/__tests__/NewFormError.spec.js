import React from 'react';
import NewFormError from '../NewFormError';

it('renders correctly', () => {
  expect(shallow(<NewFormError error_messages={['this is an error']} />)).toMatchSnapshot();
});
