import React from 'react';

// NOTE: the named export isn't a connected component
import { NewCommentForm } from '../NewCommentForm';

it('renders correctly', () => {
  expect(shallow(
    <NewCommentForm />
  )).toMatchSnapshot();
});
