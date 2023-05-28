// @flow

export const fetchComments = (order_id: string, options: {from_order_detail: boolean} = {from_order_detail: true}) => ({
  type: 'COMMENT:FETCH',
  payload: { order_id },
  meta: { order_id, ...options }
});

export const addComment = (order_id: string, body) => ({
  type: 'COMMENT:ADD',
  payload: { order_id, body },
  meta: { order_id }
});
