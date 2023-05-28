// @flow
import _ from 'lodash';
import moment from 'moment';
import I18n from '../../localization';
import type { Supplier, ShippingMethod, SupplierBreak } from './index';
import { date_helpers } from '../../views/utils/helpers';

const { formatTime } = date_helpers;

export const MINIMUM_GOOD_RATING = 4.75;
export const MAXIMUM_BAD_RATING = 4.45;

export const ratingClass = (rating: number) => {
  if (rating >= MINIMUM_GOOD_RATING){
    return 'good';
  } else if (rating > MAXIMUM_BAD_RATING){
    return 'meh';
  } else {
    return 'bad';
  }
};

export const isMethodClosed = (shipping_method: ShippingMethod) => {
  const opens_at_moment = moment.parseZone(shipping_method.opens_at);
  const closes_at_moment = moment.parseZone(shipping_method.closes_at);
  const now_moment = moment().utcOffset(opens_at_moment.utcOffset());
  const close_before_now = closes_at_moment.isBefore(now_moment); // e.g. was open when we got it, but we've now passed close
  const next_open_before_next_close = opens_at_moment.isBefore(closes_at_moment); // e.g. in the evening, after it's closed (as we have tomorrow's opens_at and closes_at)
  const open_after_now = opens_at_moment.isAfter(now_moment); // e.g. in the morning before the store opens (as we have todays opens_at and closes_at)

  return close_before_now || (next_open_before_next_close && open_after_now);
};

export const onBreak = (current_break: SupplierBreak) => {
  if (!current_break) return false;

  const closes_at_moment = moment.parseZone(current_break.start_time);
  const opens_at_moment = moment.parseZone(current_break.end_time);
  const now_moment = moment().utcOffset(closes_at_moment.utcOffset());
  const break_day = moment(current_break.date, 'YYYY-MM-DD');
  if (!(now_moment.date() === break_day.date() &&
      now_moment.month() === break_day.month() &&
      now_moment.year() === break_day.year())){
    return false;
  }

  const close_before_now = closes_at_moment.isBefore(now_moment);
  const open_after_now = opens_at_moment.isAfter(now_moment);

  return close_before_now && open_after_now;
};

export const supplierOpenMessage = (shipping_methods: Array<ShippingMethod>) => {
  let open_messages = [];
  shipping_methods.forEach(method => {
    const options = {closes_at: formatTime(method.closes_at), opens_at: formatTime(method.opens_at)};
    if (method.type === 'on_demand'){
      open_messages = [I18n.t(`ui.header.on_demand_closed.${isMethodClosed(method)}`, options), ...open_messages];
    } else if (method.type === 'pickup'){
      open_messages = [...open_messages, I18n.t(`ui.header.pickup_closed.${isMethodClosed(method)}`, options)];
    }
  });
  return open_messages.join(' ・ '); // e.g. open for delivery until 8:00 PM ・ pickup & shipping also available
};

export const shippingProviderOptions = (supplier: Supplier) => (
  supplier.shipping_providers.map(provider => ({text: provider, value: provider}))
);

export const formatHelpBody = (form_data: Object) => (
  _.reduce(form_data, (acc, value, key) => (
    `${acc}${I18n.t(`ui.modal.help.label.${key}`)}\n${value}\n\n`
  ), '')
);
