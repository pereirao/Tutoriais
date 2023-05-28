import React from 'react';
// NOTE: the named export isn't a connected component
import { ReportList } from '../ReportList';
import report_factory from '../../../../business/report/__tests__/report.factory';


it('renders correctly', () => {
  expect(shallow(<ReportList fetchReports={() => null} reports={[report_factory.build(), report_factory.build()]} />)).toMatchSnapshot();
});
