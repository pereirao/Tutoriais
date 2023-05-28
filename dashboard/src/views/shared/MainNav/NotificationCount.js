// @flow

import React from 'react';
import {connect} from 'react-redux';
import {notification_selectors} from '../../../business/notification';
import style_sheet from './MainNav.module.css';

const NotificationCountSTP = state => ({notice_count: notification_selectors.totalCount(state)});
const connectNotificationCount = connect(NotificationCountSTP);
type NotificationCountProps = { notice_count: number };
export const NotificationCount = ({notice_count}: NotificationCountProps) => {
  if (!notice_count) return null;
  const bubble_width = (notice_count.toString().length * 8) + 12;
  return (
    <div className={style_sheet.noticeCount} style={{width: bubble_width}}>{notice_count}</div>
  );
};

export default connectNotificationCount(NotificationCount);
