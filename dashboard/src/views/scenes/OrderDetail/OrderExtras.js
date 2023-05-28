// @flow

import React from 'react';
import { connect } from 'react-redux';
import { NewExtrasForm } from './NewExtrasForm';

type OrderExtrasProps = {
  order_id: string,
  shipment: any
};
export const OrderExtras = ({order}: OrderExtrasProps) => (
  <div>
    <NewExtrasForm shipment_id={order.id} shipment={order} valid={(valid) => console.warn(valid)} />
  </div>
);

const OrderExtrasSTP = () => {
  return {};
};
const OrderExtrasContainer = connect(OrderExtrasSTP)(OrderExtras);

export default OrderExtrasContainer;
