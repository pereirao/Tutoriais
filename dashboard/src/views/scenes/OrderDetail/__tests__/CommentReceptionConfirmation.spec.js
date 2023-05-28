import React from 'react';

// NOTE: the named export isn't a connected component
import { CommentReceptionConfirmation } from '../CommentReceptionConfirmation';

it('renders CommentReceptionConfirmation correctly', () => {
  expect(shallow(<CommentReceptionConfirmation />)).toMatchSnapshot();
});
