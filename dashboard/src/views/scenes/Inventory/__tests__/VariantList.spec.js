import React from 'react';

// NOTE: the named import is not connected to the redux store
import { VariantList } from '../VariantList';
import variant_factory from '../../../../business/variant/__tests__/variant.factory';


it('renders correctly', () => {
  expect(shallow(<VariantList fetchVariants={() => null} variants={[variant_factory.build(), variant_factory.build()]} />)).toMatchSnapshot();
});
