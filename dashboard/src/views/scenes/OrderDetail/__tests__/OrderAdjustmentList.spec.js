import React from 'react';

// NOTE: the named export isn't a connected component
import { OrderAdjustmentList } from '../OrderAdjustmentList';
import adjustment_factory from '../../../../business/adjustment/__tests__/adjustment.factory';

it('renders correctly', () => {
  const stubbed_adjustments = [adjustment_factory.build({id: 1}), adjustment_factory.build({id: 2})];
  expect(shallow(
    <OrderAdjustmentList adjustments={stubbed_adjustments} fetchAdjustments={() => {}} />
  )).toMatchSnapshot();
});
