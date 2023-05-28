// @flow

import _ from 'lodash';
import moment from 'moment';
import { format as formatPhone } from 'libphonenumber-js';
import { date_helpers } from '../../views/utils/helpers';
import { employee_helpers } from '../employee';
import I18n from '../../localization';
import type { Order, TimelineEntry } from './index';

const {
  formatDateShort,
  formatDateAbbreviation,
  formatDateLong,
  formatWindow,
  formatTimeWithMinuteOffset,
  formatDayName,
  isToday,
  differenceInHours,
  nowIsWithinMinuteThreshold,
  minutesAgo
} = date_helpers;

// const ACTIVE_STATES = ['paid', 'confirmed','scheduled', 'exception', 'en_route'];
// const UNCONFIRMED_STATES = ['paid', 'scheduled'];
const TABLE_TAGS = ['vip', 'scheduled', 'gift', 'new_customer', 'allow_substitution', 'engraving'];
export const UPDATEABLE_FROM_LIST_STATES = ['confirmed', 'en_route'];
export const UPDATEABLE_FROM_DETAIL_STATES = ['paid', 'scheduled'];
const TERMINAL_STATES = ['exception', 'canceled', 'delivered'];
const SCHEDULED_CONFIRM_THRESHOLD_MINUTES = 180; // 3 hours should be same as Shipment::SCHEDULING_BUFFER on server
const DELIVERY_ESTIMATE_OPTION_COUNT = 6;
const SCHEDULED_DELIVERY_ESTIMATE_WINDOW_SIZE = 30; // minutes
const TERMINAL_ENTRY_TYPES = ['delivered_at', 'canceled_at'];

// TODO: clarify time data source
export const orderTableRow = (order: Order) => ({
  recipient: recipientShortName(order),
  status: {text: displayState(order), class: orderStatusClass(order)},
  tracking_number: trackingNumber(order),
  method: order.delivery_method.type,
  time: `${isToday(order.order_time) ? formatDayName(order.order_time) : formatDateShort(order.order_time)}, ${deadlineTime(order)}`,
  amount: I18n.l('currency', order.amounts.total),
  attributes: orderAttributes(order),
  update_state: {id: order.id, updateable: updateableFromList(order) }
});

export const orderStatusClass = (order: Order) => {
  switch (order.state){
    case 'paid':
    case 'canceled':
      return 'attention';
    case 'scheduled':{
      return isScheduledSoon(order) ? 'attention' : 'waiting';
    }
    case 'confirmed':
    case 'en_route':
      return 'stable';
    case 'delivered':
      return 'success';
    case 'exception':
      return 'warning';
    default:
      return 'stable';
  }
};

export const orderStateModalIconType = (order: Order) => (order.type_tags.scheduled ? 'scheduled' : order.delivery_method.type);
export const nextState = (order: Order) => {
  switch (order.state){
    case 'paid':
      return isScheduledFor(order) && !isScheduledSoon(order) ? 'scheduled' : 'confirmed';
    case 'scheduled':
      return 'confirmed';
    case 'confirmed':
      if (isShipped(order)){
        return 'delivered';
      } else {
        return 'en_route';
      }
    case 'picked_up':
      return 'delivered';
    case 'en_route':
      return 'delivered';
    default:
      return null;
  }
};
export const orderAttributes = (order: Order) => Object.keys(_.pickBy(order.type_tags)).filter(tag => TABLE_TAGS.includes(tag));
export const orderAllowSubstitution = (order: Order) => orderAttributes(order).indexOf('allow_substitution') > -1;

/* Boolean Helpers */

export const updateableFromDetail = (order: Order) => (
  !isTerminalState(order) &&
  (updateableFromList(order) || order.state === 'paid' || isScheduledSoon(order))
);

export const updateableFromList = (order: Order) => {
  const list = order.using_delivery_service ? UPDATEABLE_FROM_LIST_STATES.filter(state => state !== 'confirmed') : UPDATEABLE_FROM_LIST_STATES;
  return list.includes(order.state);
};

export const isGift = (order: Order) => order && order.type_tags.gift;
export const isShipped = (order: Order) => order && order.delivery_method.type === 'shipped';
export const isPickup = (order: Order) => order && order.delivery_method.type === 'pickup';
export const isUnconfirmed = (order: Order) => {
  return order.state === 'paid' || isScheduledSoon(order);
};
export const isCanceled = (order: Order) => order && order.state === 'canceled';
export const isException = (order: Order) => order && order.state === 'exception';
export const isScheduledFor = (order: Order) => order && !!order.scheduled_for;
export const isTerminalState = (order: Order) => TERMINAL_STATES.includes(order.state);

/* Detail Info Helpers */

export const deadlineTime = (order: Order) => {
  if (isScheduledFor(order)){
    return I18n.t('ui.header.deadline.window', {window: formatWindow(order.scheduled_for, order.scheduled_for_end)});
  }
  const time = isShipped(order) ? I18n.t('ui.header.deadline.eod') : formatTimeWithMinuteOffset(order.order_time, order.delivery_method.maximum_delivery_expectation);
  return I18n.t('ui.header.deadline.time', {time});
};
export const deadlineDate = (order: Order) => formatDateLong(order.order_time);

//TODO add in logic to differentiate scheduled orders within and without confirmation threshold
export const notificationTiming = (order: Order) => {
  let time_string = I18n.t('ui.body.notification_timing.asap');
  if (isScheduledFor(order)){
    time_string = formatWindow(order.scheduled_for, order.scheduled_for_end);
    if (!isToday(order.scheduled_for)) time_string = `${time_string} on ${formatDateAbbreviation(order.scheduled_for)}`;
  }
  return I18n.t(`ui.body.notification_timing.${deliveryMethodType(order)}`, {time_string});
};
export const orderNumber = (order: Order) => order && order.number;
export const trackingNumber = (order: Order) => order && order.tracking_details && order.tracking_details.tracking_number;
export const carrier = (order: Order) => order && order.tracking_details && order.tracking_details.carrier;
export const formattedAddress = (order: Order) => {
  if (!order.address) return null;
  const { address } = order;
  let main_text = address.address1 || '';
  if (!_.isEmpty(address.address2)) main_text = `${main_text}, ${address.address2}`;
  const secondary_present = address.city && address.state && address.zip_code;
  const secondary_text = secondary_present ? `${address.city}, ${address.state} ${address.zip_code}` : '';
  return {main_text, secondary_text};
};
export const addressLocation = (order: Order) => {
  if (!order.address) return null;
  const { lat, lng } = order.address.coords;
  return { latitude: lat, longitude: lng };
};
export const customerName = (order: Order) => order && order.customer_name;
export const customerNotes = (order: Order) => order && order.notes;

export const recipientName = (order: Order) => order.recipient_info && (order.recipient_info.long_name || order.customer_name);
export const recipientShortName = (order: Order) => (
  order.recipient_info && (order.recipient_info.short_name || order.customer_name)
);
export const recipientPhone = (order: Order) => _.get(order, 'recipient_info.phone') && formatPhone(order.recipient_info.phone, 'US', 'National');
export const cardDetails = (order: Order) => (
  `${_.startCase(order.billing.cc_type)} **** ${order.billing.last_digits}`
);

export const customerBirthdate = (order: Order) => {
  // eslint-disable-next-line no-console
  console.log(order);
  return _.get(order, 'birthdate') && moment(order.birthdate).format('ll');
};

export const isScheduledSoonNoStateFilter = (order: Order) => (
  isScheduledFor(order) &&
  nowIsWithinMinuteThreshold(order.scheduled_for, SCHEDULED_CONFIRM_THRESHOLD_MINUTES)
);

export const isScheduledSoon = (order: Order) => (
  isScheduledFor(order) &&
  (order.state === 'scheduled' || order.state === 'paid') &&
  nowIsWithinMinuteThreshold(order.scheduled_for, SCHEDULED_CONFIRM_THRESHOLD_MINUTES)
);

export const orderState = (order: Order) => order.state;
export const displayState = (order: Order) => {
  switch (order.state){
    case 'en_route':
      return I18n.t(`ui.header.display_state.en_route.${order.delivery_method.type}`);
    case 'delivered':
      return I18n.t(`ui.header.display_state.delivered.${order.delivery_method.type}`);
    case 'scheduled':
      return I18n.t(`ui.header.display_state.scheduled.${isScheduledSoon(order)}`);
    default:
      return I18n.t(`ui.header.display_state.${order.state}`);
  }
};
export const giftMessage = (order: Order) => order && order.gift_message;
export const deliveryMethodType = (order: Order) => _.get(order, 'delivery_method.type');
export const driverName = (order: Order) => order && order.driver && employee_helpers.driverName(order.driver);
export const orderItems = (order: Order) => order && order.order_items;
export const engravingOrderItems = (order: Order) => order && order.order_items && order.order_items.filter((oi) => { return oi.item_options && oi.item_options.line1 });
export const amounts = (order: Order) => order && order.amounts;
export const orderAdjustmentIds = (order: Order) => order && order.order_adjustment_ids;
export const commentIds = (order: Order) => order && order.comment_ids;
export const receiptURL = (order: Order) => order && order.receipt_url;
export const minutesSinceCanceled = (order: Order) => (
  order && order.canceled_at && minutesAgo(moment.parseZone(order.canceled_at)).toString()
);

export const formatTimelineAttribution = (entry: TimelineEntry) => {
  switch (entry.type){
    case 'created_at':
      return I18n.t('ui.body.timeline_attribution.created_at', {name: entry.meta.name});
    case 'comment':
      return I18n.t('ui.body.timeline_attribution.comment', {name: entry.meta.name});
    case 'en_route_at':{
      const title = I18n.t(`ui.body.timeline_attribution.en_route_at.${entry.meta.delivery_method_type}`);
      if (!entry.meta.driverName){
        return title;
      } else {
        const driver = I18n.t('ui.body.timeline_attribution.delivered_by', {name: entry.meta.driverName});
        return `${title}. ${driver}`;
      }
    }
    case 'delivered_at':
      return I18n.t(`ui.body.timeline_attribution.delivered_at.${entry.meta.delivery_method_type}`);
    default:
      return I18n.t(`ui.body.timeline_attribution.${entry.type}`);
  }
};

export const isTerminalEntry = (entry: TimelineEntry) => TERMINAL_ENTRY_TYPES.includes(entry.type);

// TODO: refactor this mess
export const orderStateTimelineEntries = (order: Order) => {
  const {created_at, confirmed_at, canceled_at, en_route_at, delivered_at} = order;
  let timelineEntries = [];
  if (canceled_at) timelineEntries = [...timelineEntries, {time: canceled_at, type: 'canceled_at' }]; // TODO: add canceled by whom
  if (created_at){
    timelineEntries = [
      ...timelineEntries,
      {time: created_at, type: 'created_at', meta: {name: customerName(order)} }
    ];
  }
  if (confirmed_at) timelineEntries = [...timelineEntries, {time: confirmed_at, type: 'confirmed_at' }]; // TODO: add confirmed by whom
  if (en_route_at){
    timelineEntries = [
      ...timelineEntries,
      {
        time: en_route_at,
        type: 'en_route_at',
        meta: {delivery_method_type: deliveryMethodType(order), driverName: driverName(order)}
      }
    ];
  }
  if (delivered_at){
    timelineEntries = [
      ...timelineEntries,
      { time: delivered_at, type: 'delivered_at', meta: {delivery_method_type: deliveryMethodType(order)} }
    ];
  }

  return timelineEntries;
};

export const makeDeliveryEstimateOption = (order, index) => {
  if (isScheduledFor(order)){
    const start = formatTimeWithMinuteOffset(order.scheduled_for, SCHEDULED_DELIVERY_ESTIMATE_WINDOW_SIZE * index);
    const end = formatTimeWithMinuteOffset(order.scheduled_for, SCHEDULED_DELIVERY_ESTIMATE_WINDOW_SIZE * (index + 1));
    return {min: start, max: end};
  }
  const interval = order.delivery_method.maximum_delivery_expectation / DELIVERY_ESTIMATE_OPTION_COUNT;
  return {min: index * interval, max: (index * interval) + interval};
};

export const makeDeliveryEstimateParam = (order, index) => {
  if (isScheduledFor(order)){
    return {min: SCHEDULED_DELIVERY_ESTIMATE_WINDOW_SIZE * index, max: SCHEDULED_DELIVERY_ESTIMATE_WINDOW_SIZE * (index + 1)};
  } else {
    return makeDeliveryEstimateOption(order, index);
  }
};

export const deliveryEstimateOptions = (order: Order) => {
  if (isScheduledFor(order)){
    const window_minutes = differenceInHours(order.scheduled_for_end, order.scheduled_for) * 60; //minutes
    return (
      _.range(window_minutes / SCHEDULED_DELIVERY_ESTIMATE_WINDOW_SIZE).map(index => {
        return {value: index, text: I18n.t('form.option.scheduled_delivery_estimate', makeDeliveryEstimateOption(order, index))};
      })
    );
  } else {
    const on_time_options = _.range(DELIVERY_ESTIMATE_OPTION_COUNT).map(index => {
      return {value: index, text: I18n.t('form.option.delivery_estimate', makeDeliveryEstimateOption(order, index))};
    });
    const late_options = _.range(DELIVERY_ESTIMATE_OPTION_COUNT / 2).map(index => { // add half as many late options
      const late_index = index + DELIVERY_ESTIMATE_OPTION_COUNT;
      return {value: late_index, text: I18n.t('form.option.delivery_estimate_late', makeDeliveryEstimateOption(order, late_index))};
    });
    return [...on_time_options, ...late_options];
  }
};

export const orderItemTableRow = (order_item: OrderItem) => ({
  quantity: order_item.quantity,
  product: productName(order_item),
  unit_price: I18n.l('currency', order_item.unit_price),
  total: I18n.l('currency', order_item.unit_price * order_item.quantity)
});

export const orderItemEngravingData = (order_item: OrderItem) => ({
  quantity: order_item.quantity,
  product: order_item.name,
  item_options: order_item.item_options
});

export const productName = (order_item: OrderItem) => (
  `${order_item.name} — ${order_item.item_size} — ${order_item.sku.toUpperCase()}`
);

export const appliedFiltersArray = (filters: OrderFilters) => {
  if (_.isEmpty(filters)) return [];
  const date_filters = _.map(_.pickBy(filters.date_range), (value, key) => ({value, type: key}));
  const {delivery_method_types, attributes} = filters;
  const delivery_method_type_filters = delivery_method_types ? delivery_method_types.map(value => ({value, type: 'filter'})) : [];
  const attribute_filters = attributes ? attributes.map(value => ({value, type: 'filter'})) : [];
  return [...date_filters, ...delivery_method_type_filters, ...attribute_filters];
};

export const filtersEmpty = (filters: OrderFilters) => (
  _.isEmpty(filters.delivery_method_types) && _.isEmpty(filters.attributes) && _.isEmpty(_.pickBy(filters.date_range))
);

/* order list accessors */

export const listIds = (order_list: OrderList) => order_list.ids;
export const listTotalPages = (order_list: OrderList) => order_list.total_pages;
export const listTotalCount = (order_list: OrderList) => order_list.total_count;
export const listNextPage = (order_list: OrderList) => order_list.next_page;
export const listQuery = (order_list: OrderList) => order_list.query;
export const listFilters = (order_list: OrderList) => order_list.filters;
export const isListStale = (order_list: OrderList) => order_list.is_stale;
