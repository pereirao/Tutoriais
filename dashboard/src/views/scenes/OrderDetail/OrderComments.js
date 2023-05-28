// @flow

import React from 'react';
import { connect } from 'react-redux';
import { comment_selectors } from '../../../business/comment';
import CommentTranscript from './CommentTranscript';
import NewCommentForm from './NewCommentForm';

type OrderCommentsProps = {
  order_id: string,
  isMinibarClosed: () => void,
  comment_ids: Array<number>,
  is_fetching: boolean,
};
export const OrderComments = ({order_id, isMinibarClosed, comment_ids, is_fetching}: OrderCommentsProps) => (
  <div>
    <CommentTranscript order_id={order_id} comment_ids={comment_ids} />
    <NewCommentForm order_id={order_id} isMinibarClosed={isMinibarClosed} is_fetching={is_fetching} />
  </div>
);

const OrderCommentsSTP = state => ({is_fetching: comment_selectors.isFetching(state)});
const OrderCommentsContainer = connect(OrderCommentsSTP)(OrderComments);

export default OrderCommentsContainer;
