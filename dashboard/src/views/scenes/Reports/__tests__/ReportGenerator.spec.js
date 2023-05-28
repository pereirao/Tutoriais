import React from 'react';
import { ReportGenerator } from '../ReportGenerator';

it('renders correctly', () => {
  expect(shallow(<ReportGenerator />)).toMatchSnapshot();
});
