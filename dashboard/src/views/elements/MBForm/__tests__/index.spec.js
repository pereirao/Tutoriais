import React from 'react';

// NOTE: the named export isn't a connected component
import { MBForm } from '../index';

it('renders correctly', () => {
  expect(shallow(<MBForm />)).toMatchSnapshot();
});
