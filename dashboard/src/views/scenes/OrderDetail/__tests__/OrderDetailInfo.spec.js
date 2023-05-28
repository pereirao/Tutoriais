import React from 'react';

import order_factory from '../../../../business/order/__tests__/order.factory';
import { order_helpers } from '../../../../business/order';
import OrderDetailInfo, { OrderAddress, CustomerNotesSection } from '../OrderDetailInfo';

const { formattedAddress, customerNotes } = order_helpers;

it('renders OrderDetailInfo correctly', () => {
  expect(shallow(<OrderDetailInfo order={order_factory.build()} />)).toMatchSnapshot();
});

it('omits customer notes if not present', () => {
  expect(shallow(<OrderDetailInfo order={order_factory.build({notes: ''})} />)).toMatchSnapshot();
});

it('omits recipient address if pickup order', () => {
  expect(shallow(<OrderDetailInfo order={order_factory.build('pickup')} />)).toMatchSnapshot();
});

it('renders OrderAddress correctly', () => {
  expect(shallow(<OrderAddress formattedAddress={formattedAddress(order_factory.build())} />)).toMatchSnapshot();
});

it('renders CustomerNotesSection correctly', () => {
  expect(shallow(<CustomerNotesSection formattedAddress={customerNotes(order_factory.build())} />)).toMatchSnapshot();
});
