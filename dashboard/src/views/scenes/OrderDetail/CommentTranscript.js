// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames/bind';
import * as Ent from '@minibar/store-business/src/utils/ent';
import I18n from '../../../localization';
import type {Comment} from '../../../business/comment';
import {comment_actions, comment_selectors, comment_helpers} from '../../../business/comment';
import style_sheet from './OrderDetail.module.css';
import CommentReceptionConfirmation from './CommentReceptionConfirmation';

const cx = classNames.bind(style_sheet);

const {
  commentNote,
  sentToCustomer,
  trimNotePrefix,
  commentAttribution,
  isFromMinibar,
  isSupplier
} = comment_helpers;

type CommentTranscriptProps = {
  order_id: string,
  comments: Array<Comment>,
  comment_ids: Array<number>,
  is_fetching: boolean,
  fetchComments: (string) => void
};

export class CommentTranscript extends PureComponent {
  props: CommentTranscriptProps

  componentWillMount() {
    this.props.fetchComments(this.props.order_id);
  }

  componentWillReceiveProps(next_props) {
    if (next_props.comment_ids.length > next_props.comments.length) this.props.fetchComments(this.props.order_id);
  }

  isLastCommentFromMinibar = () => _.last(this.props.comments) && !isSupplier(_.last(this.props.comments))

  render() {
    const {order_id, comments, comment_ids, is_fetching} = this.props;
    if (is_fetching && _.isEmpty(comment_ids)) return <div>LOADING ...</div>; // TODO real loading state
    if (!comments) return null;
    return (
      <div className={style_sheet.commentTranscriptWrapper}>
        {comments.map(c => <CommentBubble key={c.id} comment={c}/>)}
        {is_fetching && <div>LOADING ...</div>}
        {!is_fetching && this.isLastCommentFromMinibar() && <CommentReceptionConfirmation order_id={order_id}/>}
      </div>
    );
  }
}

type CommentBubbleProps = { comment: Comment };
export const CommentBubble = ({comment}: CommentBubbleProps) => {
  const bubble_class = cx({commentBubble: true, external: isFromMinibar(comment)});
  const commentContents = () => {
    if (sentToCustomer(comment)) return <CustomerNote note={commentNote(comment)}/>;
    return <p className={style_sheet.commentNote}>{commentNote(comment)}</p>;
  };

  return (
    <div className={style_sheet.commentBubbleWrapper}>
      <div className={bubble_class}>{commentContents()}</div>
      <p className={style_sheet.commentAttribution}>{commentAttribution(comment)}</p>
    </div>
  );
};

type CustomerNoteProps = { note: string };
export const CustomerNote = ({note}: CustomerNoteProps) => (
  <div>
    <p>{I18n.t('ui.body.sent_to_customer')}</p>
    <div className={style_sheet.customerNote}>
      <p>{trimNotePrefix(note)}</p>
    </div>
  </div>
);

const CommentTranscriptSTP = () => {
  const findComment = Ent.find('comment');
  return (state, {comment_ids}) => {
    return {
      comments: findComment(state, comment_ids),
      is_fetching: comment_selectors.isFetching(state)
    };
  };
};
const CommentTranscriptDTP = {fetchComments: comment_actions.fetchComments};
const CommentTranscriptContainer = connect(CommentTranscriptSTP, CommentTranscriptDTP)(CommentTranscript);

export default CommentTranscriptContainer;
