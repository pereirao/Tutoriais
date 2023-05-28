// @flow

export const fetchAdjustments = (order_id: string) => ({
  type: 'ADJUSTMENT:FETCH',
  payload: { order_id },
  meta: { order_id }
});
