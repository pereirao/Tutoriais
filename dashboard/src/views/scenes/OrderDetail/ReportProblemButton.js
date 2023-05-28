// @flow

import React, {PureComponent} from 'react';
import type Order from '../../../business/order';
import I18n from '../../../localization';
import ReportProblemModal from '../../shared/ReportProblemModal';
import style_sheet from './OrderDetail.module.css';


type ReportProblemButtonProps = { order: Order, isMinibarClosed: () => void, visible: boolean };
type ReportProblemButtonState = { is_modal_open: boolean };

class ReportProblemButton extends PureComponent {
  props: ReportProblemButtonProps
  state: ReportProblemButtonState

  constructor(props) {
    super(props);
    this.state = {is_modal_open: false};
  }

  componentWillReceiveProps = (next_props) => { // NOTE: this closes the modal on successful problem reporting
    if (this.props.visible && !next_props.visible) this.setState({is_modal_open: false});
  }

  toggleModalVisibility = () => {
    this.setState({is_modal_open: !this.state.is_modal_open});
  }

  render() {
    if (!this.props.visible) return null;
    return (
      <div className={style_sheet.reportProblemButtonWrapper}>
        <div
          className={style_sheet.reportProblemButton}
          onClick={this.toggleModalVisibility}
          title={I18n.t('accessibility.title.report_problem')}>
          <p className={style_sheet.reportProblemButtonText}>{I18n.t('ui.button.report_problem')}</p>
        </div>
        <ReportProblemModal
          hidden={!this.state.is_modal_open}
          order={this.props.order}
          close={this.toggleModalVisibility}
          isMinibarClosed={this.props.isMinibarClosed}/>
      </div>
    );
  }
}

export default ReportProblemButton;
