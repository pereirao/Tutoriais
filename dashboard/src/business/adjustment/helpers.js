// @flow

// import _ from 'lodash';
// import I18n from '../../localization';
import { date_helpers } from '../../views/utils/helpers';
import type { Adjustment } from './index';

const { formatTime, formatDateShort } = date_helpers;

// TODO: create display reason through i18n
export const adjustmentReason = (adjustment: Adjustment) => adjustment.reason;
export const adjustmentAmount = (adjustment: Adjustment) => adjustment.amount;

export const tableRow = (adjustment: Adjustment) => ({
  time: formatTime(adjustment.created_at),
  date: formatDateShort(adjustment.created_at),
  reason: adjustment.reason,
  description: adjustment.description,
  adjustment: `${adjustment.credit ? '-' : '+'}${adjustment.amount}` // TODO: i18n message with variable
});
