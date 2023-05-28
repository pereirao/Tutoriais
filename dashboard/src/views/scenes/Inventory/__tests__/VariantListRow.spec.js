import React from 'react';

import { VariantListRow } from '../VariantListRow';
import { variant_helpers } from '../../../../business/variant';
import variant_factory from '../../../../business/variant/__tests__/variant.factory';


const { VARIANTS_COLUMN_ORDER } = variant_helpers;
const VARIANT = variant_factory.build({id: 1});

it('renders correctly', () => {
  expect(shallow(<VariantListRow key={VARIANT.id} columns={VARIANTS_COLUMN_ORDER} variant={VARIANT} />)).toMatchSnapshot();
});
