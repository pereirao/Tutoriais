import { variantTableRow } from '../helpers';
import variant_factory from './variant.factory';

//TODO: update when the helper is actually formatted
describe('variantTableRow', () => {
  const variant = variant_factory.build();
  it('returns object containing formatted details', () => {
    expect(variantTableRow(variant)).toEqual({
      sku: variant.sku,
      product_name: variant.name,
      product_details: `${variant.category} | ${variant.volume}`,
      case_eligible: variant.case_eligible ? 'Yes' : 'No',
      inventory: variant.inventory,
      price: variant.price,
      sale_price: variant.sale_price || 'Not discounted'
    });
  });
});
