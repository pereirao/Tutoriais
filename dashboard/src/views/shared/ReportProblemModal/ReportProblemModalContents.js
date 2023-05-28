// @flow

import React, {PureComponent} from 'react';
import {Dropdown} from 'semantic-ui-react';
import type Order from '../../../business/order';
import {PROBLEM_TYPES} from '../../../business/order';
import I18n from '../../../localization';
import ReportProblemForm from './ReportProblemForm';
import style_sheet from './ReportProblemModal.module.css';

type ReportProblemModalContentsProps = { order: Order, isMinibarClosed: () => void };
type ReportProblemModalContentsState = { problem_type: string };

class ReportProblemModalContents extends PureComponent {
  props: ReportProblemModalContentsProps
  state: ReportProblemModalContentsState

  constructor(props: ReportProblemModalContentsProps) {
    super(props);
    this.state = {problem_type: ''};
  }

  handleProblemChange = (_e, {value}) => this.setState({problem_type: value})

  render() {
    const {order, isMinibarClosed} = this.props;
    return (
      <div className={style_sheet.contentWrapper}>
        <p className={style_sheet.fieldLabel}>{I18n.t('ui.modal.report_problem.label.what_problem')}</p>
        <Dropdown
          selection
          options={PROBLEM_TYPES.map(pt => ({value: pt, text: I18n.t(`ui.modal.report_problem.problem_type.${pt}`)}))}
          onChange={this.handleProblemChange}
          placeholder={I18n.t('ui.modal.report_problem.choose_problem')}/>
        <ReportProblemForm
          problem_type={this.state.problem_type}
          order={order}
          isMinibarClosed={isMinibarClosed}/>
      </div>
    );
  }
}

export default ReportProblemModalContents;
