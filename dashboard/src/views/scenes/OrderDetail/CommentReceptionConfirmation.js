// @flow

import React from 'react';
import {connect} from 'react-redux';
import I18n from '../../../localization';
import {comment_actions} from '../../../business/comment';
import style_sheet from './OrderDetail.module.css';

type CommentReceptionConfirmationProps = { order_id: string, addComment: (string, Object) => void };
export const CommentReceptionConfirmation = ({order_id, addComment}: CommentReceptionConfirmationProps) => {
  const submitUnderstanding = (does_understand: boolean) => (
    addComment(order_id, I18n.t(`ui.body.comment_understanding.${does_understand}`))
  );

  return (
    <div className={style_sheet.commentReceptionConfirmation}>
      <div className={style_sheet.receptionConfirmationButton} onClick={() => submitUnderstanding(false)}>
        {I18n.t('ui.button.negative_understanding')}
      </div>
      <div className={style_sheet.receptionConfirmationButton} onClick={() => submitUnderstanding(true)}>
        {I18n.t('ui.button.positive_understanding')}
      </div>
    </div>
  );
};

const CommentReceptionConfirmationDTP = {addComment: comment_actions.addComment};
const CommentReceptionConfirmationContainer = connect(null, CommentReceptionConfirmationDTP)(CommentReceptionConfirmation);

export default CommentReceptionConfirmationContainer;
