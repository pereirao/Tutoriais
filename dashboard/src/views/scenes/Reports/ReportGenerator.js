//@flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dropdown} from 'semantic-ui-react';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
import {report_actions} from '../../../business/report';
import I18n from '../../../localization';
import style_sheet from './Report.module.css';

// TODO: Switch to MBForm Component
// TODO: use MBButton Component with better special snowflake styling options
export class ReportGenerator extends PureComponent {
  props: ReportsProps
  state: ReportsState

  constructor(props: ReportsProps) {
    super(props);
    this.state = {
      start_date: null,
      end_date: null,
      report_type: null,
      focused_field: ''
    };
  }

  // TODO: put in I18n and un-stub
  stubData = [
    {
      text: 'Orders',
      value: 'ORDERS'
    },
    {
      text: 'Driver Tips',
      value: 'TIPS'
    },
    {
      text: 'Itemized Orders',
      value: 'ITEMIZED_ORDERS'
    },
    {
      text: 'Adjustments',
      value: 'ADJUSTMENTS'
    }
  ]

  isBeforeStart = date => date.isBefore(this.state.start_date)
  isAfterEnd = date => date.isAfter(this.state.end_date)

  render() {
    return (
      <div className={style_sheet.generatorWrapper}>
        <Dropdown
          placeholder="Select Report Type"
          onChange={(e, type) => this.setState({report_type: type.value})}
          selection
          options={this.stubData}
          className={style_sheet.reportTypeSelect}/>
        <SingleDatePicker
          date={this.state.start_date}
          onDateChange={date => this.setState({focused_field: '', start_date: date})}
          focused={this.state.focused_field === 'start_date'}
          onFocusChange={({focused}) => {
            this.setState({focused_field: focused ? 'start_date' : ''});
          }}
          numberOfMonths={1}
          placeholder={I18n.t('ui.placeholder.start_date')}
          anchorDirection="right"
          isOutsideRange={date => date.isAfter(moment())}
          isDayBlocked={this.isAfterEnd}
          showDefaultInputIcon
          hideKeyboardShortcutsPanel/>
        <SingleDatePicker
          date={this.state.end_date}
          onDateChange={date => this.setState({focused_field: '', end_date: date})}
          focused={this.state.focused_field === 'end_date'}
          onFocusChange={({focused}) => {
            this.setState({focused_field: focused ? 'end_date' : ''});
          }}
          numberOfMonths={1}
          placeholder={I18n.t('ui.placeholder.end_date')}
          anchorDirection="right"
          isDayBlocked={this.isBeforeStart}
          isOutsideRange={date => date.isAfter(moment())}
          showDefaultInputIcon
          hideKeyboardShortcutsPanel/>
        <div
          className={style_sheet.generateButton}
          onClick={() => {
            if (this.state.report_type === null) {
              // alert('Please select a type!');
              return;
            }
            this.props.createReport({
              report_type: this.state.report_type,
              start_date: this.state.start_date ? this.state.start_date._d : Date(),
              end_date: this.state.end_date ? this.state.end_date._d : Date()
            });
            this.setState({report_type: null, start_date: null, end_date: null, focused_field: ''});
          }}>
          {I18n.t('ui.button.generate_report')}
        </div>
      </div>
    );
  }
}

const ReportGeneratorDTP = {
  createReport: report_actions.createReport
};
const ReportGeneratorContainer = connect(null, ReportGeneratorDTP)(ReportGenerator);

export default ReportGeneratorContainer;
