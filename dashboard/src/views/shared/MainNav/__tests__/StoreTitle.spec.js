import React from 'react';

import { StoreTitle } from '../StoreTitle';

it('renders StoreTitle correctly', () => {
  expect(shallow(<StoreTitle supplier_name="House of Liquids" delivery_info="open daily from dusk til dawn" />)).toMatchSnapshot();
});
