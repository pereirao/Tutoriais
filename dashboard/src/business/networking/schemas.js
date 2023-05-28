// @flow

import { schema } from 'normalizr';

/* --- product --- */
export const variant_schema = new schema.Entity('variant', {}, {idAttribute: 'sku'});
export const product_schema = new schema.Entity('product');

/* --- supplier --- */
// export const delivery_method_schema = new schema.Entity('delivery_method');
// export const supplier_schema = new schema.Entity('supplier', {
//   delivery_methods: [delivery_method_schema]
// });
export const employee_schema = new schema.Entity('employee');
export const notification_method_schema = new schema.Entity('notification_method');

export const adjustment_schema = new schema.Entity('adjustment');
export const comment_schema = new schema.Entity('comment');
export const me_schema = new schema.Entity('me');
export const notification_schema = new schema.Entity('notification');
export const order_schema = new schema.Entity('order');
export const order_item_schema = new schema.Entity('order_item');

export const report_schema = new schema.Entity('report');
