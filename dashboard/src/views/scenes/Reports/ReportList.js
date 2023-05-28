// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import * as Ent from '@minibar/store-business/src/utils/ent';
import ReportGenerator from './ReportGenerator';
import style_sheet from './Report.module.css';
import MBTable from '../../elements/MBTable';
import MBButton from '../../elements/MBButton';
import MBIcon from '../../elements/MBIcon';
import {report_helpers, report_selectors, report_actions} from '../../../business/report';
import I18n from '../../../localization';


const {allIds} = report_selectors;
const {tableRow} = report_helpers;

const REPORTS_COLUMN_ORDER = ['report_type', 'date_range', 'download'];


export class ReportList extends PureComponent {
  props: ReportListProps

  componentWillMount() {
    this.props.fetchReports();
  }

  renderButton = report => {
    if (report.state === 'pending') {
      return (
        <span>
          Loading...
        </span>
      ); // TODO: Use Loader
    } else {
      return (
        <a download href={report.report_url}>
          <MBButton button_type="link">
            <MBIcon icon="download" color="mb_red" size="small"/>
            {I18n.t('ui.button.download')}
          </MBButton>
        </a>
      );
    }
  }

  // TODO: Format Report Types from ALLCAPS to Title Case & Deal with button
  renderRow = report => {
    const row_data = tableRow(report);
    return (
      <MBTable.Row key={`${report.id}row`}>
        {REPORTS_COLUMN_ORDER.map(col => {
          return (
            <MBTable.Cell key={`${report.id}${col}`}>
              {col === 'download' ? this.renderButton(report) : row_data[col]}
            </MBTable.Cell>
          );
        })}
      </MBTable.Row>
    );
  }

  // TODO: i18n empty state
  render() {
    const {reports} = this.props;
    return (
      <div className={style_sheet.tableWrapper}>
        <ReportGenerator/>
        <MBTable.Table>
          <MBTable.Header>
            {REPORTS_COLUMN_ORDER.map(column_name => <MBTable.HeaderCell
              key={`${column_name}header`}>{I18n.t(`ui.table.${column_name}`)}</MBTable.HeaderCell>)}
          </MBTable.Header>
          <MBTable.Body>
            {reports ? reports.map(this.renderRow) : <h1>There Are No Reports</h1>}
          </MBTable.Body>
        </MBTable.Table>
      </div>
    );
  }
}

const ReportListSTP = () => {
  const find_reports = Ent.find('report');
  return state => ({
    reports: find_reports(state, allIds(state))
  });
};
const ReportListDTP = {
  fetchReports: report_actions.fetchReports
};
const ReportListContainer = connect(ReportListSTP, ReportListDTP)(ReportList);

export default ReportListContainer;
