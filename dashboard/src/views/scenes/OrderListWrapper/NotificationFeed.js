// @flow

import React from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as Ent from '@minibar/store-business/src/utils/ent';
import {notification_selectors} from '../../../business/notification';
import style_sheet from './OrderListWrapper.module.css';
import NotificationCard from './NotificationCard';

// TODO: on scroll virtualize
type NotificationFeedProps = { notifications: Array<Notification> };
export const NotificationFeed = ({notifications}: NotificationFeedProps) => {
  return (
    <ReactCSSTransitionGroup
      className={style_sheet.feedWrapper}
      transitionAppear
      transitionAppearTimeout={700}
      transitionName={style_sheet}
      transitionEnterTimeout={700}
      transitionLeaveTimeout={700}>

      {notifications.map(notification => (
        <NotificationCard
          key={notification.id}
          notification_id={notification.id}
          notification_type={notification.notification_type}
          order_id={notification.order_id}/>
      ))}
    </ReactCSSTransitionGroup>
  );
};

const NotificationFeedSTP = () => {
  const finder = Ent.find('notification');
  return state => ({
    notifications: finder(state, notification_selectors.displayOrder(state))
  });
};
const NotificationFeedContainer = connect(NotificationFeedSTP)(NotificationFeed);
export default NotificationFeedContainer;
