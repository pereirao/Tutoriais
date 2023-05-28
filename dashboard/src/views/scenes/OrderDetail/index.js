// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as Ent from '@minibar/store-business/src/utils/ent';
import type Order from '../../../business/order';
import {order_helpers, order_actions} from '../../../business/order';
import MBLoader from '../../elements/MBLoader';
import style_sheet from './OrderDetail.module.css';
import OrderDetailHeader from './OrderDetailHeader';
import OrderDetailInfo from './OrderDetailInfo';
import OrderItemList from './OrderItemList';
import OrderAdjustmentList from './OrderAdjustmentList';
import OrderDetailHistory from './OrderDetailHistory';
import OrderDetailEngraving from './OrderDetailEngraving';
import MinibarClosedModal from '../../shared/MinibarClosedModal';
import {isMinibarClosed} from '../../../business/utils/is_minibar_closed';
import type WorkingHour from '../../../business/settings';
import {settings_selectors} from '../../../business/settings';

const {workingHours} = settings_selectors;

const {orderItems, engravingOrderItems, amounts, orderAdjustmentIds, receiptURL} = order_helpers;

const RECEIPT_LOADING_DELAY = 45000; // 45 secs

type OrderDetailProps = { order: Order, workingHours: Array<WorkingHour>, fetchOrder: (string) => void };

export class OrderDetail extends PureComponent {
  props: OrderDetailProps

  state = {isMinibarClosedModalHidden: true}

  componentDidMount() {
    if (!this.props.order) {
      this.props.fetchOrder(this.props.match.params.number);
    } else if (_.isEmpty(receiptURL(this.props.order))) {
      setTimeout(() => this.props.fetchOrder(this.props.match.params.number), RECEIPT_LOADING_DELAY);
    }
  }

  handleClose = () => this.setState({isMinibarClosedModalHidden: true})

  isMinibarClosed = () => this.setState({isMinibarClosedModalHidden: !isMinibarClosed(this.props.workingHours)})

  render() {
    const {order} = this.props;
    if (!order) return <div className={style_sheet.loaderWrapper}><MBLoader size="large" type="spinner"/></div>;
    return (
      <div className={style_sheet.sceneWrapper}>
        <OrderDetailHeader order={order} isMinibarClosed={this.isMinibarClosed}/>
        { engravingOrderItems(order).length > 0 ? <OrderDetailEngraving order_items={engravingOrderItems(order)} /> : null }
        <OrderDetailInfo order={order}/>
        <OrderItemList order_items={orderItems(order)} amounts={amounts(order)}/>
        <OrderAdjustmentList order_id={order.id} adjustment_ids={orderAdjustmentIds(order)}/>
        <OrderDetailHistory order={order} isMinibarClosed={this.isMinibarClosed}/>
        <MinibarClosedModal hidden={this.state.isMinibarClosedModalHidden} close={this.handleClose}/>
      </div>
    );
  }
}

const OrderDetailSTP = () => {
  const order_finder = Ent.find('order');
  return (state, {match}) => ({
    order: order_finder(state, match.params.number),
    workingHours: workingHours(state)
  });
};
const OrderDetailDTP = {fetchOrder: order_actions.fetchOrder};
const OrderDetailContainer = connect(OrderDetailSTP, OrderDetailDTP)(OrderDetail);

export default OrderDetailContainer;
