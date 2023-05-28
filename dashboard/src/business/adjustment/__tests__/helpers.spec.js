import { tableRow, adjustmentReason, adjustmentAmount } from '../helpers';
import adjustment_factory from './adjustment.factory';
import { date_helpers } from '../../../views/utils/helpers';

const { formatTime, formatDateShort } = date_helpers;

//TODO: update when the helper is actually formatted
describe('tableRow', () => {
  const adjustment = adjustment_factory.build();
  it('returns object containing formatted time, date, reason, and action', () => {
    expect(tableRow(adjustment)).toEqual({
      time: formatTime(adjustment.created_at),
      date: formatDateShort(adjustment.created_at),
      reason: adjustment.reason,
      action: adjustment.amount
    });
  });
});

describe('adjustmentReason', () => {
  const reason = 'just cause';
  const adjustment = adjustment_factory.build({reason});
  it('returns reason string associated with adjustment', () => {
    expect(adjustmentReason(adjustment)).toEqual(reason);
  });
});

describe('adjustmentAmount', () => {
  const amount = 42;
  const adjustment = adjustment_factory.build({amount});
  it('returns amount associated with adjustment', () => {
    expect(adjustmentAmount(adjustment)).toEqual(amount);
  });
});

