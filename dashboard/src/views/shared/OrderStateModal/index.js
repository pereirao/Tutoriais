// @flow

import React from 'react';
import { connect } from 'react-redux';
import * as Ent from '@minibar/store-business/src/utils/ent';
import type Order from '../../../business/order';
import { ui_selectors, ui_actions } from '../../../business/ui';
import OrderStateModalContents from './OrderStateModalContents';
import MBModal from '../../elements/MBModal';

const { orderStateModalId } = ui_selectors;

type OrderStateModalProps = { order: Order, close: () => void };
export const OrderStateModal = ({order, close}: OrderStateModalProps) => {
  if (!order) return null;
  return (
    <MBModal close={close}>
      <OrderStateModalContents order={order} />
    </MBModal>
  );
};

const OrderStateModalSTP = () => {
  const order_finder = Ent.find('order');
  return state => ({
    order: order_finder(state, orderStateModalId(state))
  });
};
const OrderStateModalDTP = {
  close: ui_actions.closeOrderStateModal
};
const OrderStateModalContainer = connect(OrderStateModalSTP, OrderStateModalDTP)(OrderStateModal);

export default OrderStateModalContainer;
