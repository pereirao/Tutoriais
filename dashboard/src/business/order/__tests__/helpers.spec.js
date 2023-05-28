import moment from 'moment';
import { serverTimeFormat } from '@minibar/store-business/src/__tests__/utils/date';
import MockDate from 'mockdate';

import {
  orderTableRow,
  orderStatusClass,
  orderStateModalIconType,
  nextState,
  orderAttributes,
  updateableFromDetail,
  updateableFromList,
  isGift,
  isShipped,
  isPickup,
  isUnconfirmed,
  isCanceled,
  isException,
  isScheduledFor,
  deadlineTime,
  deadlineDate,
  notificationTiming,
  orderNumber,
  formattedAddress,
  customerName,
  customerNotes,
  recipientName,
  recipientShortName,
  recipientPhone,
  cardDetails,
  orderState,
  displayState,
  giftMessage,
  deliveryMethodType,
  orderItems,
  amounts,
  orderAdjustmentIds,
  commentIds,
  formatTimelineAttribution,
  orderStateTimelineEntries,
  makeDeliveryEstimateOption,
  deliveryEstimateOptions,
  orderItemTableRow,
  productName,
  isScheduledSoon,
  receiptURL,
  isTerminalEntry,
  appliedFiltersArray,
  filtersEmpty,
  listIds,
  listTotalPages,
  listTotalCount,
  listNextPage,
  listQuery,
  listFilters,
  isListStale,
  UPDATEABLE_FROM_LIST_STATES,
  UPDATEABLE_FROM_DETAIL_STATES
} from '../helpers';

import order_factory from './order.factory';

describe('activeOrders', () => {
  // TODO: implement when tab endpoints established
});

describe('orderTableRow', () => {
  const mock_date = moment('2017-01-01');
  MockDate.set(mock_date);

  it('returns row for today order', () => {
    const order = order_factory.build('shipped', {
      recipient_info: {short_name: 'Kurt Cobain'},
      state: 'paid',
      order_time: serverTimeFormat(moment('2017-01-01')),
      amounts: {total: 10},
      id: 'order1'
    });
    expect(orderTableRow(order)).toEqual({
      recipient: 'Kurt Cobain',
      status: {text: 'UNCONFIRMED', class: 'attention'},
      method: 'shipped',
      time: 'Today, Before End of Day',
      amount: '$10.00',
      attributes: ['vip'],
      update_state: {id: 'order1', updateable: false}
    });
  });

  it('returns row for non-today order', () => {
    const order = order_factory.build('shipped', {
      recipient_info: {short_name: 'Kurt Cobain'},
      state: 'paid',
      order_time: serverTimeFormat(moment('2017-01-02')),
      amounts: {total: 10},
      id: 'order1'
    });
    expect(orderTableRow(order)).toEqual({
      recipient: 'Kurt Cobain',
      status: {text: 'UNCONFIRMED', class: 'attention'},
      method: 'shipped',
      time: '01/02/2017, Before End of Day',
      amount: '$10.00',
      attributes: ['vip'],
      update_state: {id: 'order1', updateable: false}
    });
  });
});

describe('orderStatusClass', () => {
  const mock_date = moment('2017-01-01');
  MockDate.set(mock_date);

  it('returns attention for paid order', () => {
    const order = order_factory.build('paid');
    expect(orderStatusClass(order)).toEqual('attention');
  });
  it('returns attention for scheduled order that is within threshold', () => {
    const order = order_factory.build('scheduled', {scheduled_for: serverTimeFormat(mock_date.add(3, 'minutes'))});
    expect(orderStatusClass(order)).toEqual('attention');
  });
  it('returns waiting for scheduled order that is before threshold', () => {
    const order = order_factory.build('scheduled', {scheduled_for: serverTimeFormat(mock_date.add(3, 'hours'))});
    expect(orderStatusClass(order)).toEqual('waiting');
  });
  it('returns stable for confirmed order', () => {
    const order = order_factory.build('confirmed');
    expect(orderStatusClass(order)).toEqual('stable');
  });
  it('returns stable for en_route order', () => {
    const order = order_factory.build('en_route');
    expect(orderStatusClass(order)).toEqual('stable');
  });
  it('returns success for delivered order', () => {
    const order = order_factory.build('delivered');
    expect(orderStatusClass(order)).toEqual('success');
  });
  it('returns attention for canceled order', () => {
    const order = order_factory.build('canceled');
    expect(orderStatusClass(order)).toEqual('attention');
  });
  it('returns warning for exception order', () => {
    const order = order_factory.build('exception');
    expect(orderStatusClass(order)).toEqual('warning');
  });
});

describe('orderStateModalIconType', () => {
  it('returns delivery_method_type if not scheduled', () => {
    const order = order_factory.build('scheduled_for');
    expect(orderStateModalIconType(order)).toEqual('scheduled');
  });
  it('returns scheduled for scheduled order', () => {
    const order = order_factory.build();
    expect(orderStateModalIconType(order)).toEqual('on_demand');
  });
});

describe('nextState', () => {
  it('returns confirmed for paid order', () => {
    const order = order_factory.build('paid');
    expect(nextState(order)).toEqual('confirmed');
  });
  it('returns scheduled for paid scheduled_for order', () => {
    const order = order_factory.build('paid', 'scheduled_for');
    expect(nextState(order)).toEqual('scheduled');
  });
  it('returns confirmed for scheduled order', () => {
    const order = order_factory.build('scheduled');
    expect(nextState(order)).toEqual('confirmed');
  });
  it('returns en_route for non-shipped confirmed order', () => {
    const order = order_factory.build('confirmed');
    expect(nextState(order)).toEqual('en_route');
  });
  it('returns delivered for shipped confirmed order', () => {
    const order = order_factory.build('confirmed', 'shipped');
    expect(nextState(order)).toEqual('delivered');
  });
  it('returns delivered for en_route order', () => {
    const order = order_factory.build('en_route');
    expect(nextState(order)).toEqual('delivered');
  });
});

describe('orderAttributes', () => {
  it('returns vip for vip order', () => {
    const order = order_factory.build();
    expect(orderAttributes(order)).toEqual(['vip']);
  });
  it('returns multiple tags if present', () => {
    const order = order_factory.build('gift');
    expect(orderAttributes(order)).toEqual(['gift', 'vip']);
  });
});

describe('updateableFromDetail', () => {
  it('returns true if on updateable whitelist', () => {
    const order = order_factory.build({state: UPDATEABLE_FROM_DETAIL_STATES[0]});
    expect(updateableFromDetail(order)).toEqual(true);
  });
  it('returns false if canceled order', () => {
    const order = order_factory.build('canceled');
    expect(updateableFromDetail(order)).toEqual(false);
  });
});

describe('updateableFromList', () => {
  it('returns true if on updateable whitelist', () => {
    const order = order_factory.build({state: UPDATEABLE_FROM_LIST_STATES[0]});
    expect(updateableFromList(order)).toEqual(true);
  });
  it('returns false if paid order', () => {
    const order = order_factory.build({state: 'paid'});
    expect(updateableFromList(order)).toEqual(false);
  });
});

describe('isGift', () => {
  it('returns true if is gift', () => {
    const order = order_factory.build('gift');
    expect(isGift(order)).toEqual(true);
  });
  it('returns false if is not gift', () => {
    const order = order_factory.build();
    expect(isGift(order)).toEqual(false);
  });
});

describe('isShipped', () => {
  it('returns true if is shipped', () => {
    const order = order_factory.build('shipped');
    expect(isShipped(order)).toEqual(true);
  });
  it('returns false if is not shipped', () => {
    const order = order_factory.build();
    expect(isShipped(order)).toEqual(false);
  });
});

describe('isPickup', () => {
  it('returns true if is pickup', () => {
    const order = order_factory.build('pickup');
    expect(isPickup(order)).toEqual(true);
  });
  it('returns false if is not pickup', () => {
    const order = order_factory.build();
    expect(isPickup(order)).toEqual(false);
  });
});

describe('isUnconfirmed', () => {
  it('returns true if is unconfirmed', () => {
    const order = order_factory.build('paid');
    expect(isUnconfirmed(order)).toEqual(true);
  });
  it('returns false if is confirmed', () => {
    const order = order_factory.build('confirmed');
    expect(isUnconfirmed(order)).toEqual(false);
  });
});

describe('isCanceled', () => {
  it('returns true if is canceled', () => {
    const order = order_factory.build('canceled');
    expect(isCanceled(order)).toEqual(true);
  });
  it('returns false if is canceled', () => {
    const order = order_factory.build();
    expect(isCanceled(order)).toEqual(false);
  });
});

describe('isException', () => {
  it('returns true if is exception', () => {
    const order = order_factory.build('exception');
    expect(isException(order)).toEqual(true);
  });
  it('returns false if is exception', () => {
    const order = order_factory.build();
    expect(isException(order)).toEqual(false);
  });
});

describe('isScheduledFor', () => {
  it('returns true if is scheduled', () => {
    const order = order_factory.build('scheduled_for');
    expect(isScheduledFor(order)).toEqual(true);
  });
  it('returns false if is not scheduled', () => {
    const order = order_factory.build();
    expect(isScheduledFor(order)).toEqual(false);
  });
});


describe('deadlineTime', () => {
  it('returns window if scheduled', () => {
    const order = order_factory.build('scheduled_for');
    expect(deadlineTime(order)).toEqual('Between 4 - 6 AM');
  });
  it('returns end of day if shipped', () => {
    const order = order_factory.build('shipped');
    expect(deadlineTime(order)).toEqual('Before End of Day');
  });
  it('returns time of expectation threshold if not shipped or scheduled', () => {
    const order = order_factory.build();
    expect(deadlineTime(order)).toEqual('Before 1:00 AM');
  });
});

describe('deadlineDate', () => {
  it('returns long date format of order_time', () => {
    const order = order_factory.build();
    expect(deadlineDate(order)).toEqual('Today, 01/01/2017');
  });
});

// TODO: test other cases
describe('notificationTiming', () => {
  it('returns formatted notification timing', () => {
    const order = order_factory.build();
    expect(notificationTiming(order)).toEqual('Deliver ASAP');
  });
});

describe('orderNumber', () => {
  it('returns order number', () => {
    const order = order_factory.build({number: '1234567890'});
    expect(orderNumber(order)).toEqual('1234567890');
  });
});

describe('formattedAddress', () => {
  it('returns formatted order address object', () => {
    const order = order_factory.build();
    expect(formattedAddress(order)).toEqual({
      main_text: '21 Jump Street, Apt 5',
      secondary_text: 'Brooklyn, NY 11206'
    });
  });
  it('returns formatted order address object omitting comma if no address2', () => {
    const order = order_factory.build({
      address: {
        address1: '21 Jump Street',
        city: 'Brooklyn',
        state: 'NY',
        zip_code: 11206
      }
    });
    expect(formattedAddress(order)).toEqual({
      main_text: '21 Jump Street',
      secondary_text: 'Brooklyn, NY 11206'
    });
  });
});

describe('customerName', () => {
  it('returns customer name from order', () => {
    const order = order_factory.build({customer_name: 'Kenny Dennis'});
    expect(customerName(order)).toEqual('Kenny Dennis');
  });
});

describe('customerNotes', () => {
  it('returns customer notes from order', () => {
    const order = order_factory.build({notes: "Favorite actor Dennehy, favorite drink O'Doul's"});
    expect(customerNotes(order)).toEqual("Favorite actor Dennehy, favorite drink O'Doul's");
  });
});

describe('recipientName', () => {
  it('returns recipient name from order', () => {
    const order = order_factory.build({recipient_info: {long_name: 'My Girl - Jules'}});
    expect(recipientName(order)).toEqual('My Girl - Jules');
  });
});

describe('recipientShortName', () => {
  it('returns recipient short name from order', () => {
    const order = order_factory.build({recipient_info: {short_name: 'My Girl'}});
    expect(recipientShortName(order)).toEqual('My Girl');
  });
});

describe('recipientPhone', () => {
  it('returns recipient phone number from order', () => {
    const order = order_factory.build({recipient_info: {phone: '5558675309'}});
    expect(recipientPhone(order)).toEqual('(555) 867-5309');
  });
});

describe('cardDetails', () => {
  it('returns card details from order', () => {
    const order = order_factory.build({billing: {last_digits: '1234', cc_type: 'visa'}});
    expect(cardDetails(order)).toEqual('Visa **** 1234');
  });
});

describe('orderState', () => {
  it('returns state from order', () => {
    const order = order_factory.build('delivered');
    expect(orderState(order)).toEqual('delivered');
  });
});

describe('displayState', () => {
  const mock_date = moment('2017-01-01');
  MockDate.set(mock_date);

  it('returns display state from en_route pickup order', () => {
    const order = order_factory.build('en_route', 'pickup');
    expect(displayState(order)).toEqual('READY FOR PICKUP');
  });
  it('returns display state from en_route on_demand order', () => {
    const order = order_factory.build('en_route');
    expect(displayState(order)).toEqual('OUT FOR DELIVERY');
  });
  it('returns display state from delivered shipped order', () => {
    const order = order_factory.build('delivered', 'shipped');
    expect(displayState(order)).toEqual('SHIPPED');
  });
  it('returns display state from delivered pickup order', () => {
    const order = order_factory.build('delivered', 'pickup');
    expect(displayState(order)).toEqual('PICKED UP');
  });
  it('returns display state from delivered on_demand order', () => {
    const order = order_factory.build('delivered');
    expect(displayState(order)).toEqual('DELIVERED');
  });
  it('returns display state from standard transition order', () => {
    const order = order_factory.build('confirmed', 'pickup');
    expect(displayState(order)).toEqual('CONFIRMED');
  });
  it('returns display state scheduled order within threshold', () => {
    const order = order_factory.build('scheduled', {scheduled_for: serverTimeFormat(mock_date.add(3, 'minutes'))});
    expect(displayState(order)).toEqual('UNCONFIRMED');
  });
  it('returns display state scheduled order before threshold', () => {
    const order = order_factory.build('scheduled', {scheduled_for: serverTimeFormat(mock_date.add(3, 'hours'))});
    expect(displayState(order)).toEqual('SCHEDULED');
  });
});

describe('giftMessage', () => {
  it('returns gift message from order', () => {
    const order = order_factory.build('gift');
    expect(giftMessage(order)).toEqual('this one is for you');
  });
});

describe('deliveryMethodType', () => {
  it('returns delivery_method_type from order', () => {
    const order = order_factory.build('pickup');
    expect(deliveryMethodType(order)).toEqual('pickup');
  });
});

describe('orderItems', () => {
  it('returns order items from order', () => {
    const order = order_factory.build('with_order_items');
    expect(orderItems(order)).toEqual([
      {id: 1, item_size: '6 pack, 12 oz bottles', name: 'Budweiser Light', quantity: 3, sku: 'asdfghjkl', unit_price: 12.49},
      {id: 2, item_size: '750 ml bottle', name: 'Cupcake', quantity: 2, sku: 'qweryuoo', unit_price: 10.49}
    ]);
  });
});

describe('amounts', () => {
  it('returns amounts from order', () => {
    const order = order_factory.build();
    expect(amounts(order)).toEqual({
      delivery_fee: 5,
      minibar_promos: 2.35,
      store_discounts: 2,
      subtotal: 43.47,
      tax: 3.48,
      tip: 4.35,
      total: 51.95
    });
  });
});

describe('orderAdjustmentIds', () => {
  it('returns order adjustment ids from order', () => {
    const order = order_factory.build('with_order_adjustment_ids');
    expect(orderAdjustmentIds(order)).toEqual([1, 2]);
  });
});

describe('commentIds', () => {
  it('returns comment ids from order', () => {
    const order = order_factory.build('with_comment_ids');
    expect(commentIds(order)).toEqual([1, 2]);
  });
});

describe('formatTimelineAttribution', () => {
  it('formats created at with customer name', () => {
    const entry = {type: 'created_at', meta: {name: 'Bob Dylan'}};
    expect(formatTimelineAttribution(entry)).toEqual('Placed by Bob Dylan (customer)');
  });
  it('formats comment with commenter name', () => {
    const entry = {type: 'comment', meta: {name: 'Greg Allman'}};
    expect(formatTimelineAttribution(entry)).toEqual('Note added by Greg Allman');
  });
  it('formats en_route_at for pickup order', () => {
    const entry = {type: 'en_route_at', meta: {delivery_method_type: 'pickup'}};
    expect(formatTimelineAttribution(entry)).toEqual('Marked as Ready for Pickup');
  });
  it('formats en_route_at for on_demand order', () => {
    const entry = {type: 'en_route_at', meta: {delivery_method_type: 'on_demand'}};
    expect(formatTimelineAttribution(entry)).toEqual('Marked as Out for Delivery');
  });
  it('formats delivered_at for on_demand order', () => {
    const entry = {type: 'delivered_at', meta: {delivery_method_type: 'on_demand'}};
    expect(formatTimelineAttribution(entry)).toEqual('Marked as Delivered');
  });
  it('formats delivered_at for shipped order', () => {
    const entry = {type: 'delivered_at', meta: {delivery_method_type: 'shipped'}};
    expect(formatTimelineAttribution(entry)).toEqual('Marked as Shipped');
  });
  it('formats delivered_at for pickup order', () => {
    const entry = {type: 'delivered_at', meta: {delivery_method_type: 'pickup'}};
    expect(formatTimelineAttribution(entry)).toEqual('Marked as Picked Up');
  });
  it('formats canceled_at for order', () => {
    const entry = {type: 'canceled_at'};
    expect(formatTimelineAttribution(entry)).toEqual('Canceled');
  });
});

describe('orderStateTimelineEntries', () => {
  it('returns entries for created, confirmed, started delivery, and delivered', () => {
    const order = order_factory.build('delivered');
    expect(orderStateTimelineEntries(order)).toEqual([
      {meta: {name: 'Biggie Smalls'}, time: '2017-01-02T00:00:00-05:00', type: 'created_at'},
      {time: '2017-01-03T00:00:00-05:00', type: 'confirmed_at'},
      {meta: {delivery_method_type: 'on_demand'}, time: '2017-01-04T00:00:00-05:00', type: 'en_route_at'},
      {meta: {delivery_method_type: 'on_demand'}, time: '2017-01-05T00:00:00-05:00', type: 'delivered_at'}
    ]);
  });
  it('returns entries for canceled', () => {
    const order = order_factory.build('canceled');
    expect(orderStateTimelineEntries(order)).toEqual([{time: '2017-01-04T00:00:00-05:00', type: 'canceled_at'}]);
  });
});

describe('makeDeliveryEstimateOption', () => {
  it('returns delivery estimate window option', () => {
    const order = order_factory.build();
    expect(makeDeliveryEstimateOption(order, 0)).toEqual({min: 0, max: 10});
  });
});

describe('deliveryEstimateOptions', () => {
  it('returns array of estimate options within max expectation', () => {
    const order = order_factory.build();
    expect(deliveryEstimateOptions(order, 0)).toEqual([
      {text: '0 - 10 minutes', value: 0},
      {text: '10 - 20 minutes', value: 1},
      {text: '20 - 30 minutes', value: 2},
      {text: '30 - 40 minutes', value: 3},
      {text: '40 - 50 minutes', value: 4},
      {text: '50 - 60 minutes', value: 5},
      {text: '60 - 70 minutes (LATE)', value: 6},
      {text: '70 - 80 minutes (LATE)', value: 7},
      {text: '80 - 90 minutes (LATE)', value: 8}
    ]);
  });
});

describe('orderItemTableRow', () => {
  it('returns table row for order item', () => {
    const order = order_factory.build('with_order_items');
    expect(orderItemTableRow(order.order_items[0])).toEqual({
      product: 'Budweiser Light — 6 pack, 12 oz bottles — ASDFGHJKL',
      quantity: 3,
      total: '$37.47',
      unit_price: '$12.49'
    });
  });
});

describe('productName', () => {
  it('returns formatted product name for order item', () => {
    const order = order_factory.build('with_order_items');
    expect(productName(order.order_items[0])).toEqual('Budweiser Light — 6 pack, 12 oz bottles — ASDFGHJKL');
  });
});

describe('isScheduledSoon', () => {
  const mock_date = moment('2017-01-01');
  MockDate.set(mock_date);

  it('returns false if order not scheduled_for', () => {
    const order = order_factory.build('paid');
    expect(isScheduledSoon(order)).toEqual(false);
  });
  it('returns true if order scheduled_for and within threshold', () => {
    const order = order_factory.build('scheduled', {scheduled_for: serverTimeFormat(mock_date.add(3, 'minutes'))});
    expect(isScheduledSoon(order)).toEqual(true);
  });
  it('returns false if order scheduled_for but before threshold', () => {
    const order = order_factory.build('scheduled', {scheduled_for: serverTimeFormat(mock_date.add(3, 'hours'))});
    expect(isScheduledSoon(order)).toEqual(false);
  });
});

describe('receiptURL', () => {
  it('returns receipt url for order', () => {
    const order = order_factory.build();
    expect(receiptURL(order)).toEqual('http://www.minibardelivery.com');
  });
});

describe('isTerminalEntry', () => {
  it('returns true if delivered_at entry', () => {
    const entry = { time: 'timestamp', type: 'delivered_at', meta: {fake: 'stuff'} };
    expect(isTerminalEntry(entry)).toEqual(true);
  });
  it('returns true if canceled_at entry', () => {
    const entry = { time: 'timestamp', type: 'canceled_at', meta: {fake: 'stuff'} };
    expect(isTerminalEntry(entry)).toEqual(true);
  });
  it('returns false if not canceled_at or delivered_at entry', () => {
    const entry = { time: 'timestamp', type: 'en_route_at', meta: {fake: 'stuff'} };
    expect(isTerminalEntry(entry)).toEqual(false);
  });
});


describe('appliedFiltersArray', () => {
  const filters = {
    date_range: {start: 'fake_timestamp', end: 'other_fake_timestamp'},
    delivery_method_types: ['on_demand'],
    attributes: ['gift']
  };
  it('returns value and type for all filters', () => {
    expect(appliedFiltersArray(filters)).toEqual([
      {type: 'start', value: 'fake_timestamp'},
      {type: 'end', value: 'other_fake_timestamp'},
      {type: 'filter', value: 'on_demand'},
      {type: 'filter', value: 'gift'}
    ]);
  });
});

describe('filtersEmpty', () => {
  it('returns true if no filters set', () => {
    const filters = {
      date_range: {start: '', end: ''},
      delivery_method_types: [],
      attributes: []
    };
    expect(filtersEmpty(filters)).toEqual(true);
  });
  it('returns false if filters set', () => {
    const filters = {
      date_range: {start: 'fake_timestamp', end: ''},
      delivery_method_types: [],
      attributes: []
    };
    expect(filtersEmpty(filters)).toEqual(false);
  });
});

describe('order list helpers', () => {
  const order_list = {
    ids: ['order1', 'order2', 'order3', 'order4'],
    total_pages: 3,
    total_count: 30,
    next_page: 2,
    query: 'beer',
    filters: {fake: 'filters'},
    is_stale: false
  };

  describe('listIds', () => {
    it('returns Ids associated with order list', () => {
      expect(listIds(order_list)).toEqual(['order1', 'order2', 'order3', 'order4']);
    });
  });
  describe('listTotalPages', () => {
    it('returns TotalPages associated with order list', () => {
      expect(listTotalPages(order_list)).toEqual(3);
    });
  });
  describe('listTotalCount', () => {
    it('returns TotalCount associated with order list', () => {
      expect(listTotalCount(order_list)).toEqual(30);
    });
  });
  describe('listNextPage', () => {
    it('returns NextPage associated with order list', () => {
      expect(listNextPage(order_list)).toEqual(2);
    });
  });
  describe('listQuery', () => {
    it('returns Query associated with order list', () => {
      expect(listQuery(order_list)).toEqual('beer');
    });
  });
  describe('listFilters', () => {
    it('returns Filters associated with order list', () => {
      expect(listFilters(order_list)).toEqual({fake: 'filters'});
    });
  });
  describe('isListStale', () => {
    it('returns whether list is stale', () => {
      expect(isListStale(order_list)).toEqual(false);
    });
  });
});
