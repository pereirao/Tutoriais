// @flow

import type { Variant } from './index';

export const VARIANTS_COLUMN_ORDER = [
  'mobile_summary',
  'sku',
  'product_name',
  'case_eligible',
  'inventory',
  'price',
  'sale_price',
  'edit',
  'active'
];

export const variantTableRow = (variant: Variant) => ({
  sku: variant.sku,
  product_name: variant.name,
  product_details: `${variant.category} | ${variant.volume}`, // TODO: Conditional Formatting if no volume or category?
  case_eligible: variant.case_eligible ? 'Yes' : 'No',
  inventory: variant.inventory,
  price: variant.price,
  sale_price: variant.sale_price || 'Not discounted'
});
