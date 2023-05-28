//@flow

import _ from 'lodash';
import type { Report } from './index';

export const tableRow = (report: Report) => ({
  report_type: _.startCase(_.lowerCase(report.report_type)),
  date_range: `${report.start_date} - ${report.end_date}`,
  report_url: report.report_url
});
