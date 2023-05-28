import React from 'react';

import comment_factory from '../../../../business/comment/__tests__/comment.factory';
// NOTE: the named export isn't a connected component
import { CommentTranscript, CustomerNote, CommentBubble } from '../CommentTranscript';

it('renders CommentTranscript correctly', () => {
  expect(shallow(
    <CommentTranscript
      fetchComments={() => {}}
      comments={[comment_factory.build()]} />
  )).toMatchSnapshot();
});

it('renders CommentReceptionConfirmation if last comment from xxxx@minibardelivery.com', () => {
  expect(shallow(
    <CommentTranscript
      fetchComments={() => {}}
      comments={[comment_factory.build('from_minibar')]} />
  )).toMatchSnapshot();
});

it('renders CustomerNote correctly', () => {
  expect(shallow(<CustomerNote note="This is a note" />)).toMatchSnapshot();
});

it('renders CommentBubble correctly', () => {
  expect(shallow(<CommentBubble comment={comment_factory.build()} />)).toMatchSnapshot();
});
