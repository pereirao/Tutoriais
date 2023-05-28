// @flow

import _ from 'lodash';
import moment from 'moment';
import I18n from '../../localization';
import { date_helpers } from '../../views/utils/helpers';
import type { Exception } from '../order';
import type { Comment } from './index';

const { formatTimestamp, minutesAgo } = date_helpers;

const MINIBAR_EMAIL_DOMAIN_SUFFIX = 'minibardelivery.com';
export const SENT_TO_CUSTOMER_PREFIX = 'SENT TO CUSTOMER:';

// TODO: create display reason through i18n
export const commentNote = (comment: Comment) => comment.note;
export const commentAttribution = (comment: Comment) => (
  `${formattedAuthor(comment)} - ${formatTimestamp(comment.created_at)}`
);
export const isFromMinibar = (comment: Comment) => {
  if (comment.posted_as){
    return comment.posted_as === 'minibar';
  }
  return comment.author.email && comment.author.email.endsWith(MINIBAR_EMAIL_DOMAIN_SUFFIX);
};

export const isSupplier = (comment: Comment) => comment && comment.posted_as === 'supplier';

// e.g. Brian Cooper (Minibar CX) or Pratik Shah (employee)
export const formattedAuthor = (comment: Comment) => {
  const options = {name: comment.author.name};
  return isFromMinibar(comment) ? I18n.t('ui.body.comment_author.cx', options) : I18n.t('ui.body.comment_author.employee', options);
};

export const commentTimelineEntries = (comments: Array<Comment>) => (
  comments.map(comment => ({time: comment.created_at, type: 'comment', meta: {name: formattedAuthor(comment)} }))
);

export const sentToCustomer = (comment: Comment) => comment.note && comment.note.startsWith(SENT_TO_CUSTOMER_PREFIX);
export const trimNotePrefix = (note: string) => note.split(': ')[1];

export const commentNotification = (comment: Comment, order_id: string) => {
  const notification = {id: `comment_${order_id}`, order_id, notification_type: 'comment' };
  return notification;
};

export const createdAt = (comment: Comment) => comment && formatTimestamp(moment.parseZone(comment.created_at));
export const minutesSinceCreated = (comment: Comment) => {
  return minutesAgo(moment.parseZone(comment.created_at)).toString();
};

export const exceptionComment = (exception: Exception) => {
  const exception_items = _.map(exception.metadata, (value, key) => {
    const key_text = I18n.t(`ui.body.report_problem.${exception.type}.${key}`);
    return `${key_text}: ${value}`;
  });
  return exception_items.join('\n');
};
