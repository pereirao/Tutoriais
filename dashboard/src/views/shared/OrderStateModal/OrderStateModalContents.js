// @flow

import React, {PureComponent} from 'react';
import I18n from '../../../localization';
import type {Order} from '../../../business/order';
import {order_helpers} from '../../../business/order';
import style_sheet from './OrderStateModal.module.css';
import OrderTypeIcon from '../OrderTypeIcon';
import OrderStateForm from './OrderStateForm';

const {
  deliveryMethodType,
  nextState,
  isGift,
  recipientName,
  orderStateModalIconType
} = order_helpers;

// TODO use MBForm
type OrderStateModalContentsProps = {
  order: Order
};

class OrderStateModalContents extends PureComponent {
  props: OrderStateModalContentsProps

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {order} = this.props;
    const scope = `ui.modal.${deliveryMethodType(order)}.${nextState(order)}`;
    const order_title = I18n.t(`ui.modal.${isGift(order) ? 'gift' : 'order'}`);

    return (
      <div className={style_sheet.container}>
        <OrderTypeIcon type={orderStateModalIconType(order)}/>
        <h3 className={style_sheet.question}>{I18n.t(`${scope}.question`, {
          recipient_name: recipientName(order),
          order_title
        })}</h3>
        <OrderStateForm
          order_id={order.id}
          show_dsp_flipper={order.show_dsp_flipper}
          delivery_method_type={deliveryMethodType(order)}
          proposed_state={nextState(order)}
          is_gift={isGift(order)}/>
      </div>
    );
  }
}

export default OrderStateModalContents;
