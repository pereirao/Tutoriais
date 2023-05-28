// @flow

import React, {PureComponent} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import {Dropdown} from 'semantic-ui-react';
import {format as formatPhone} from 'libphonenumber-js';
import {SUCCESS_STATUS, ERROR_STATUS} from '../../../business/utils/fetch_status';
import {session_selectors} from '../../../business/session';
import I18n from '../../../localization';
import MBButton from '../../elements/MBButton';
import MBModal from '../../elements/MBModal';
import HelpForm from './HelpForm';
import style_sheet from './HelpModal.module.css';
import phone_icon from './assets/phone.png';
import email_icon from './assets/email.png';

const cx = classNames.bind(style_sheet);

const STATUS_NOTIFICATION_DELAY = 3000;
const HELP_SUBJECTS = ['supplies', 'inventory', 'reports', 'invoice', 'change_hours', 'change_zone', 'create_break', 'late_deliveries', 'other'];

type HelpModalProps = { hidden: boolean, close: () => void, help_message_status: string };
type HelpModalState = { help_subject: string, message_status: string };

class HelpModal extends PureComponent {
  props: HelpModalProps
  state: HelpModalState

  constructor(props) {
    super(props);
    this.state = {help_subject: '', message_status: ''};
  }

  componentWillReceiveProps(next_props) {
    if (next_props.help_message_status === SUCCESS_STATUS || next_props.help_message_status === ERROR_STATUS) {
      this.setState({message_status: next_props.help_message_status.toLowerCase()});
      setTimeout(() => {
        this.setState({message_status: ''});
      }, STATUS_NOTIFICATION_DELAY);
    }
  }

  handleSubjectChange = (_e, option) => {
    this.setState({help_subject: _.get(option, 'value')});
  }
  handlePhone = () => {
    window.open(`tel:${I18n.t('ui.modal.help.phone')}`);
  }
  handleEmail = () => {
    window.open(`mailto:${I18n.t('ui.modal.help.email')}`);
  }

  clearSubject = () => {
    this.setState({help_subject: ''});
  }

  render() {
    const {hidden, close} = this.props;
    const {message_status} = this.state;
    if (hidden) return null;

    return (
      <MBModal close={close} size="large">
        <div className={style_sheet.contentWrapper}>
          <p className={style_sheet.helpModalHeader}>{I18n.t('ui.modal.help.message')}</p>
          <Dropdown
            selection
            fluid
            value={this.state.help_subject}
            options={HELP_SUBJECTS.map(subject => ({value: subject, text: I18n.t(`ui.modal.help.subject.${subject}`)}))}
            onChange={this.handleSubjectChange}
            placeholder={I18n.t('ui.modal.help.subject.placeholder')}/>
          {_.isEmpty(message_status) && <HelpForm subject={this.state.help_subject} clearSubject={this.clearSubject}/>}
          <p
            className={cx('messageStatus', message_status)}>{_.isEmpty(message_status) ? '' : I18n.t(`ui.body.help_message_notification.${message_status}`)}</p>
          <p className={style_sheet.helpModalHeader}>{I18n.t('ui.modal.help.contact')}</p>
          <div className={style_sheet.contactRow}>
            <MBButton button_type="secondary" onClick={this.handlePhone} expand>
              <img className={style_sheet.contactIcon} src={phone_icon} alt={I18n.t('accessibility.icon.phone')}/>
              {formatPhone(I18n.t('ui.modal.help.phone'), 'US', 'National')}
            </MBButton>
            <span className={style_sheet.contactSpacer}/>
            <MBButton button_type="secondary" onClick={this.handleEmail} expand>
              <img className={style_sheet.contactIcon} src={email_icon} alt={I18n.t('accessibility.icon.email')}/>
              {I18n.t('ui.modal.help.email')}
            </MBButton>
          </div>
        </div>
      </MBModal>
    );
  }
}

const HelpModalSTP = state => ({help_message_status: session_selectors.helpMessageStatus(state)});
const HelpModalContainer = connect(HelpModalSTP)(HelpModal);

export default HelpModalContainer;
