// @flow

import React, {PureComponent} from 'react';
import _ from 'lodash';
import moment from 'moment';
import {connect} from 'react-redux';
import * as Ent from '@minibar/store-business/src/utils/ent';
import classNames from 'classnames/bind';
import style_sheet from './OrderDetail.module.css';
import {date_helpers} from '../../utils/helpers';
import MBIcon from '../../elements/MBIcon';
import type {Order, TimelineEntry} from '../../../business/order';
import {order_helpers} from '../../../business/order';
import {comment_helpers} from '../../../business/comment';
import {employee_actions} from '../../../business/employee';

const {formatTimestamp} = date_helpers;

const cx = classNames.bind(style_sheet);

const {orderStateTimelineEntries, commentIds, formatTimelineAttribution, isTerminalEntry} = order_helpers;

type OrderTimelineProps = { order: Order, comment_timeline_entries: Array<TimelineEntry>, fetchEmployees: () => void };

export class OrderTimeline extends PureComponent {
  props: OrderTimelineProps

  componentWillMount() {
    this.props.fetchEmployees();
  }

  render() {
    const {order, comment_timeline_entries} = this.props;
    const mixed_entries = [...orderStateTimelineEntries(order), ...comment_timeline_entries];
    const mixed_sorted_entries = _.sortBy(mixed_entries, [(entry) => moment.parseZone(entry.time)]);

    return (
      <div>
        {mixed_sorted_entries.map((entry, index) => {
          if (isTerminalEntry(entry) && index + 1 === mixed_sorted_entries.length) return <OrderTimelineEntry
            key={`${entry.time}${entry.type}`} entry={entry}/>;
          return [
            <OrderTimelineEntry key={`${entry.time}${entry.type}`} entry={entry}/>,
            <div key={`${entry.time}${entry.type}_separator`} className={style_sheet.separatorLine}/>
          ];
        })}
      </div>
    );
  }
}

type OrderTimelineEntryProps = { entry: TimelineEntry };
export const OrderTimelineEntry = ({entry}: OrderTimelineEntryProps) => {
  const dot_class = cx({
    entryDot: true,
    comment: entry.type === 'comment',
    delivered: entry.type === 'delivered_at',
    canceled: entry.type === 'canceled_at'
  });

  const determineIcon = (entry_type) => {
    switch (entry_type) {
      case 'comment':
        return 'note';
      case 'delivered_at':
        return 'check';
      case 'canceled_at':
        return 'cancel';
      default:
        return null;
    }
  };

  return (
    <div className={style_sheet.timelineEntry}>
      <div className={dot_class}>
        <MBIcon icon={determineIcon(entry.type)} color="mb_white"/>
      </div>
      <div className={style_sheet.timelineEntryText}>
        <p className={style_sheet.timelineEntryTitle}>{formatTimelineAttribution(entry)}</p>
        <p className={style_sheet.timelineEntryTimestamp}>{formatTimestamp(entry.time)}</p>
      </div>
    </div>
  );
};

const OrderTimelineSTP = () => {
  const findComments = Ent.find('comment');
  return (state, {order}) => {
    return {
      order: {...order, driver: state.employee.by_id[order.driver_id]},
      comment_timeline_entries: comment_helpers.commentTimelineEntries(findComments(state, commentIds(order)))
    };
  };
};
const OrderTimelineContainerDTP = {fetchEmployees: employee_actions.fetchEmployees};
const OrderTimelineContainer = connect(OrderTimelineSTP, OrderTimelineContainerDTP)(OrderTimeline);

export default OrderTimelineContainer;
