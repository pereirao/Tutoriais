import React from 'react';

import ReportProblemForm from '../ReportProblemForm';

it('renders form for out_of_stock problem_type', () => {
  expect(shallow(<ReportProblemForm problem_type="out_of_stock" />)).toMatchSnapshot();
});
it('renders form for incorrect_pricing problem_type', () => {
  expect(shallow(<ReportProblemForm problem_type="incorrect_pricing" />)).toMatchSnapshot();
});
it('renders form for incorrect_listing problem_type', () => {
  expect(shallow(<ReportProblemForm problem_type="incorrect_listing" />)).toMatchSnapshot();
});
it('renders form for incomplete_address problem_type', () => {
  expect(shallow(<ReportProblemForm problem_type="incomplete_address" />)).toMatchSnapshot();
});
it('renders form for suspected_fraud problem_type', () => {
  expect(shallow(<ReportProblemForm problem_type="suspected_fraud" />)).toMatchSnapshot();
});
it('renders form for driver_unavailable problem_type', () => {
  expect(shallow(<ReportProblemForm problem_type="driver_unavailable" />)).toMatchSnapshot();
});
it('renders form for failed_delivery problem_type', () => {
  expect(shallow(<ReportProblemForm problem_type="failed_delivery" />)).toMatchSnapshot();
});
it('renders form for other problem_type', () => {
  expect(shallow(<ReportProblemForm problem_type="other" />)).toMatchSnapshot();
});
