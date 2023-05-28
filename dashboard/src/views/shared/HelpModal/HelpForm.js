// @flow

import React, {PureComponent} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import I18n from '../../../localization';
import style_sheet from './HelpModal.module.css';
import {session_actions, session_helpers, session_selectors} from '../../../business/session';
import {MBForm, MBFormSubmitButton} from '../../elements/MBForm';
import {BreakPeriodField, FreeResponseField, PermanenceField, NameField, DeliveryExpectationField} from '../form_fields';

const {formatHelpBody} = session_helpers;

const help_subject_forms = {
  supplies: (_subject, _clearSubject) => (
    <a
      className={style_sheet.suppliesLink}
      target="_blank"
      rel="noopener noreferrer"
      href="https://minibardelivery.typeform.com/to/cZ9mGc">
      {I18n.t('ui.modal.help.label.supplies')}
    </a>
  ),
  inventory: (subject, clearSubject) => (
    <HelpFormWrapper subject={subject} clearSubject={clearSubject}>
      <FieldLabel key="contact_email_label">{I18n.t('ui.modal.help.label.contact_email')}</FieldLabel>
      <NameField name="contact_email" placeholder={I18n.t('ui.modal.help.placeholder.email')}/>
      <FieldLabel key="inventory_label">{I18n.t('ui.modal.help.label.inventory')}</FieldLabel>
      <FreeResponseField key="inventory" name="inventory"/>
    </HelpFormWrapper>
  ),
  reports: (subject, clearSubject) => (
    <HelpFormWrapper subject={subject} clearSubject={clearSubject}>
      <FieldLabel key="contact_email_label">{I18n.t('ui.modal.help.label.contact_email')}</FieldLabel>
      <NameField name="contact_email" placeholder={I18n.t('ui.modal.help.placeholder.email')}/>
      <FieldLabel key="reports_label">{I18n.t('ui.modal.help.label.inventory')}</FieldLabel>
      <FreeResponseField key="reports" name="inventory"/>
    </HelpFormWrapper>
  ),
  invoice: (subject, clearSubject) => (
    <HelpFormWrapper subject={subject} clearSubject={clearSubject}>
      <FieldLabel key="contact_email_label">{I18n.t('ui.modal.help.label.contact_email')}</FieldLabel>
      <NameField name="contact_email" placeholder={I18n.t('ui.modal.help.placeholder.email')}/>
      <FieldLabel key="invoice_label">{I18n.t('ui.modal.help.label.invoice')}</FieldLabel>
      <FreeResponseField key="invoice" name="inventory"/>
    </HelpFormWrapper>
  ),
  change_hours: (subject, clearSubject) => (
    <HelpFormWrapper subject={subject} clearSubject={clearSubject}>
      <FieldLabel key="contact_email">{I18n.t('ui.modal.help.label.contact_email')}</FieldLabel>
      <NameField key="contact_email" name="contact_email" placeholder={I18n.t('ui.modal.help.placeholder.email')}/>
      <FieldLabel key="change_hours_how_label">{I18n.t('ui.modal.help.label.change_hours_how')}</FieldLabel>
      <FreeResponseField key="change_hours_how" name="change_hours_how"/>
      <FieldLabel key="change_hours_which_label">{I18n.t('ui.modal.help.label.change_hours_permanence')}</FieldLabel>
      <PermanenceField/>
    </HelpFormWrapper>
  ),
  change_zone: (subject, clearSubject) => (
    <HelpFormWrapper subject={subject} clearSubject={clearSubject}>
      <FieldLabel key="contact_email_label">{I18n.t('ui.modal.help.label.contact_email')}</FieldLabel>
      <NameField name="contact_email" placeholder={I18n.t('ui.modal.help.placeholder.email')}/>
      <FieldLabel key="change_zone_how_label">{I18n.t('ui.modal.help.label.change_zone_how')}</FieldLabel>
      <FreeResponseField key="change_zone_how" name="change_zone_how"/>
      <p key="change_zone_note"
         className={style_sheet.changeZoneNote}>{I18n.t('ui.modal.help.label.change_zone_note')}</p>
    </HelpFormWrapper>
  ),
  create_break: (_subject, clearSubject) => (
    <BreakFormContainer clearSubject={clearSubject}/>
  ),
  late_deliveries: (_subject, clearSubject) => (
    <DeliveryExpectationFormContainer clearSubject={clearSubject} />
  ),
  other: (subject, clearSubject) => (
    <HelpFormWrapper subject={subject} clearSubject={clearSubject}>
      <FieldLabel key="contact_email_label">{I18n.t('ui.modal.help.label.contact_email')}</FieldLabel>
      <NameField name="contact_email" placeholder={I18n.t('ui.modal.help.placeholder.email')}/>
      <FieldLabel key="other_label">{I18n.t('ui.modal.help.label.other')}</FieldLabel>
      <FreeResponseField name="other"/>
    </HelpFormWrapper>
  )
};

const FieldLabel = ({children}) => <p className={style_sheet.fieldLabel}>{children}</p>;

const HelpFormWrapperDTP = {sendForHelp: session_actions.sendForHelp};
const connectHelpFormWrapper = connect(null, HelpFormWrapperDTP);

type HelpFormWrapperProps = {
  subject: string,
  sendForHelp: (string, string) => void,
  clearSubject: () => void,
  children: any
};
const HelpFormWrapper = connectHelpFormWrapper(({
                                                  subject,
                                                  sendForHelp,
                                                  clearSubject,
                                                  children
                                                }: HelpFormWrapperProps) => {
  const handleSubmit = values => {
    clearSubject();
    sendForHelp(subject, formatHelpBody(values));
  };
  return (
    <ReactCSSTransitionGroup
      className={style_sheet.formWrapper}
      transitionAppear
      transitionAppearTimeout={700}
      transitionName={style_sheet}
      transitionEnterTimeout={700}
      transitionLeaveTimeout={700}>
      <MBForm
        key={subject}
        onSubmit={handleSubmit}
        validateSubmittable={fields => _.every(fields, 'value')}
        className={style_sheet.helpForm}>
        {children}
        <MBFormSubmitButton key="submit" text={I18n.t('ui.modal.help.send')}/>
      </MBForm>
    </ReactCSSTransitionGroup>
  );
});

type BreakFormWrapperProps = {
  clearSubject: () => void,
  takeBreak: () => void,
};
type BreakFormWrapperState = {
  period: string
};

class BreakFormWrapper extends PureComponent {
  props: BreakFormWrapperProps
  state: BreakFormWrapperState

  constructor(props) {
    super(props);
    this.state = {pediod: null};
  }

  setPeriod = (period) => this.setState({period})

  render() {
    const {clearSubject, takeBreak} = this.props;
    const {period} = this.state;

    return (
      <ReactCSSTransitionGroup
        className={style_sheet.formWrapper}
        transitionAppear
        transitionAppearTimeout={700}
        transitionName={style_sheet}
        transitionEnterTimeout={700}
        transitionLeaveTimeout={700}>
        <div className={style_sheet.helpForm}>
          <FieldLabel key="create_break_period_label">{I18n.t('ui.modal.help.label.create_break_period')}</FieldLabel>
          <BreakPeriodField onChange={this.setPeriod}/>
          <MBFormSubmitButton
            key="submit"
            button_type={!period && 'disabled'}
            text={I18n.t('ui.modal.help.send')}
            onClick={() => {
              clearSubject();
              takeBreak(period);
            }}/>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

const BreakFormContainer = connect(
  (state) => ({shippingMethods: session_selectors.shippingMethods(state)}),
  (dispatch) => ({
    takeBreak: period => dispatch(session_actions.takeBreak(period))
  })
)(BreakFormWrapper);

type DeliveryExpectationFormWrapperProps = {
  clearSubject: () => void,
  takeBreak: () => void,
};
type DeliveryExpectationFormWrapperState = {
  period: string,
  delivery_expectation: string
};
class DeliveryExpectationFormWrapper extends PureComponent {
  props: DeliveryExpectationFormWrapperProps
  state: DeliveryExpectationFormWrapperState

  constructor(props){
    super(props);
    this.state = { pediod: null, delivery_expectation: null };
  }

  setPeriod = (period) => this.setState({period})
  setDeliveryExpectation = (delivery_expectation) => this.setState({delivery_expectation})

  render(){
    const { clearSubject, changeDeliveryExpectation } = this.props;
    const { period, delivery_expectation } = this.state;

    return (
      <ReactCSSTransitionGroup
        className={style_sheet.formWrapper}
        transitionAppear
        transitionAppearTimeout={700}
        transitionName={style_sheet}
        transitionEnterTimeout={700}
        transitionLeaveTimeout={700}>
        <div className={style_sheet.helpForm}>
          <FieldLabel key="create_break_period_label">{I18n.t('ui.modal.help.label.change_delivery_expectation_for_how_long')}</FieldLabel>
          <BreakPeriodField onChange={this.setPeriod} />
          <FieldLabel key="create_break_period_label">{I18n.t('ui.modal.help.label.new_delivery_expectation')}</FieldLabel>
          <DeliveryExpectationField onChange={this.setDeliveryExpectation} />
          <MBFormSubmitButton
            key="submit"
            button_type={(!period || !delivery_expectation) && 'disabled'}
            text={I18n.t('ui.modal.help.send')}
            onClick={() => {
              clearSubject();
              changeDeliveryExpectation(period, delivery_expectation);
            }} />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

const DeliveryExpectationFormContainer = connect(
  (state) => ({ shippingMethods: session_selectors.shippingMethods(state) }),
  (dispatch) => ({
    changeDeliveryExpectation: (period, delivery_expectation) => dispatch(session_actions.changeDeliveryExpectation(period, delivery_expectation))
  })
)(DeliveryExpectationFormWrapper);

type HelpFormProps = { subject: string, clearSubject: () => void };
const HelpForm = ({subject, clearSubject}: HelpFormProps) => {
  if (!subject) return null;
  return help_subject_forms[subject](subject, clearSubject);
};

export default HelpForm;
