// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames/bind';
import * as Ent from '@minibar/store-business/src/utils/ent';
import I18n from '../../../localization';
import type {Comment} from '../../../business/comment';
import type {NotificationType} from '../../../business/notification';
import {notification_actions} from '../../../business/notification';
import {comment_helpers} from '../../../business/comment';
import {order_helpers, order_actions} from '../../../business/order';
import style_sheet from './OrderListWrapper.module.css';
import MBIcon from '../../elements/MBIcon';
import ViewOrderButton from '../../shared/ViewOrderButton';

const cx = classNames.bind(style_sheet);

const UPDATE_TIME_INTERVAL = 30000; // 30 Seconds

const {minutesSinceCreated} = comment_helpers;
const {
  recipientName,
  displayState,
  notificationTiming,
  commentIds,
  deliveryMethodType,
  minutesSinceCanceled
} = order_helpers;

type NotificationCardProps = {
  notification_type: NotificationType,
  order: Order,
  order_id: number,
  notification_id: number,
  removeNotification: () => void,
  fetchOrder: (string) => void,
  comment: Comment
};

export class NotificationCard extends PureComponent {
  props: NotificationCardProps

  componentWillEnter = (callback) => {
    callback();
  }

  componentWillLeave = (callback) => {
    callback();
  }

  componentDidMount() {
    if (!this.props.order) this.props.fetchOrder(this.props.order_id);
  }

  render() {
    const {
      notification_type,
      order,
      order_id,
      notification_id,
      removeNotification,
      comment
    } = this.props;
    if (!order) return <NotificationCardSkeleton/>;
    return (
      <div className={style_sheet.notificationCard}>
        <NotificationCardHeader
          notification_type={notification_type}
          delivery_method_type={deliveryMethodType(order)}
          key={`notification_header_${notification_type}_${order_id}`}/>
        <div
          className={style_sheet.notificationCardContents}
          key={`notification_body_${notification_type}_${order_id}`}>
          <h4 className={style_sheet.recipientName}>{recipientName(order)}</h4>
          <p className={style_sheet.orderState}>{displayState(order)}</p>
          <NotificationTiming
            comment={comment}
            since_canceled={minutesSinceCanceled(order)}
            notification_type={notification_type}
            initial_timing={notificationTiming(order)}/>
          <div className={style_sheet.notificationButtonWrapper}>
            <ViewOrderButton
              onClick={() => {
                if (notification_type === 'comment' || notification_type === 'canceled') {
                  removeNotification(notification_id);
                }
              }}
              className={style_sheet.viewOrderButton}
              order_id={order_id}/>
          </div>
        </div>
      </div>
    );
  }
}

export const NotificationCardHeader = ({notification_type, delivery_method_type}) => {
  let card_type = notification_type;
  if (notification_type === 'unconfirmed' || notification_type === 'canceled') {
    card_type = delivery_method_type;
  }
  return (
    <div className={cx('notificationCardHeader', {commentCardHeader: card_type === 'comment'})}>
      <div className={cx('notificationIconWrapper', {commentIconWrapper: card_type === 'comment'})}>
        <MBIcon color="mb_white" icon={card_type}/>
      </div>
      <div className={style_sheet.notificationCardTitleWrapper}>
        <p className={style_sheet.notificationCardTitle}>{I18n.t(`ui.notification_card_title.${card_type}`)}</p>
      </div>
    </div>
  );
};

type NotificationTimingProps = {
  notification_type: string,
  initial_timing: string,
  comment: Comment,
  since_canceled: number
};
type NotificationTimingState = { interval_id: string };

export class NotificationTiming extends PureComponent {
  props: NotificationTimingProps
  state: NotificationTimingState

  constructor(props) {
    super(props);
    if (props.notification_type === 'comment') {
      this.state = {
        interval_id: setInterval(this.updateMinutesAgo, UPDATE_TIME_INTERVAL),
        timing_message: I18n.t('ui.body.posted_at', {count: minutesSinceCreated(props.comment)})
      };
    } else if (props.notification_type === 'canceled') {
      this.state = {
        interval_id: setInterval(this.updateMinutesAgo, UPDATE_TIME_INTERVAL),
        timing_message: I18n.t('ui.body.canceled_at', {count: props.since_canceled})
      };
    } else {
      this.state = {interval_id: null, timing_message: props.initial_timing};
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval_id);
  }

  updateMinutesAgo = () => {
    this.setState({
      timing_message: I18n.t('ui.body.posted_at', {count: minutesSinceCreated(this.props.comment)})
    });
  }

  render() {
    return <p className={style_sheet.timingMessage}>{this.state.timing_message}</p>;
  }
}

const NotificationCardSkeleton = () => (
  <div className={style_sheet.notificationCard}>
    <div className={style_sheet.notificationCardHeader}/>
    <div className={style_sheet.notificationCardSkeleton}/>
    <div className={cx('skeletonMasker', 'headerLeft')}/>
    <div className={cx('skeletonMasker', 'headerRight')}/>
    <div className={cx('skeletonMasker', 'headerBottom')}/>
    <div className={cx('skeletonMasker', 'stateLeft')}/>
    <div className={cx('skeletonMasker', 'stateRight')}/>
    <div className={cx('skeletonMasker', 'stateBottom')}/>
    <div className={cx('skeletonMasker', 'timingLeft')}/>
    <div className={cx('skeletonMasker', 'timingRight')}/>
    <div className={cx('skeletonMasker', 'timingBottom')}/>
  </div>
);

const NotificationCardSTP = () => {
  const findOrder = Ent.find('order');
  const findComment = Ent.find('comment');
  return (state, {order_id}) => {
    const order = findOrder(state, order_id);
    return {
      order,
      comment: findComment(state, _.last(commentIds(order)))
    };
  };
};
const NotificationCardDTP = {
  removeNotification: notification_actions.removeNotification,
  fetchOrder: order_actions.fetchOrder
};
const NotificationCardContainer = connect(NotificationCardSTP, NotificationCardDTP)(NotificationCard);

export default NotificationCardContainer;
