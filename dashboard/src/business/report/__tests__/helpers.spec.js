import _ from 'lodash';
import { tableRow } from '../helpers';
import report_factory from './report.factory';

describe('tableRow', () => {
  const report = report_factory.build();
  it('returns object containing formatted type, date_range, and url', () => {
    expect(tableRow(report)).toEqual({
      report_type: _.startCase(_.lowerCase(report.report_type)),
      date_range: `${report.start_date} - ${report.end_date}`,
      report_url: report.report_url
    });
  });
});
