// @flow

import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import I18n from '../../../localization';
import {comment_actions, comment_helpers, comment_selectors} from '../../../business/comment';
import type {DeliveryMethodType, Order} from '../../../business/order';
import {order_actions, order_selectors} from '../../../business/order';
import style_sheet from './ReportProblemModal.module.css';
import {MBForm, MBFormSubmitButton} from '../../elements/MBForm';
import {FreeResponseField, OrderItemField} from '../form_fields';

const {exceptionComment} = comment_helpers;

const problem_forms = {
  out_of_stock: (problem_type, order, isMinibarClosed) => (
    <ReportProblemFormWrapper
      order={order}
      problem_type={problem_type}
      isMinibarClosed={isMinibarClosed}>
      <FieldLabel key="which_label">{I18n.t('ui.modal.report_problem.label.which_item')}</FieldLabel>
      <OrderItemField key="order_item_field" order={order}/>
      <FieldLabel key="replacement_item_label">{I18n.t('ui.modal.report_problem.label.replacement_item')}</FieldLabel>
      <FreeResponseField key="replacement_item" name="replacement_item"/>
      <FieldLabel key="replacement_price_label">{I18n.t('ui.modal.report_problem.label.replacement_price')}</FieldLabel>
      <FreeResponseField key="replacement_price" name="replacement_price"/>
    </ReportProblemFormWrapper>
  ),
  incorrect_pricing: (problem_type, order, isMinibarClosed) => (
    <ReportProblemFormWrapper
      order={order}
      problem_type={problem_type}
      isMinibarClosed={isMinibarClosed}>
      <FieldLabel key="which_label">{I18n.t('ui.modal.report_problem.label.which_item')}</FieldLabel>
      <OrderItemField key="order_item_field" order={order}/>
      <FieldLabel key="correct_price_label">{I18n.t('ui.modal.report_problem.label.incorrect_pricing')}</FieldLabel>
      <FreeResponseField key="correct_price" name="correct_price"/>
    </ReportProblemFormWrapper>
  ),
  incorrect_listing: (problem_type, order, isMinibarClosed) => (
    <ReportProblemFormWrapper
      order={order}
      problem_type={problem_type}
      isMinibarClosed={isMinibarClosed}>
      <FieldLabel key="which_label">{I18n.t('ui.modal.report_problem.label.which_item')}</FieldLabel>
      <OrderItemField key="order_item_field" order={order}/>
      <FieldLabel key="incorrect_listing_label">{I18n.t('ui.modal.report_problem.label.incorrect_listing')}</FieldLabel>
      <FreeResponseField key="incorrect_listing" name="incorrect_listing"/>
    </ReportProblemFormWrapper>
  ),
  incomplete_address: (problem_type, order, isMinibarClosed) => (
    <ReportProblemFormWrapper
      order={order}
      problem_type={problem_type}
      isMinibarClosed={isMinibarClosed}>
      <FieldLabel
        key="incomplete_address_label">{I18n.t('ui.modal.report_problem.label.incomplete_address')}</FieldLabel>
      <FreeResponseField key="incomplete_address" name="incomplete_address"/>
    </ReportProblemFormWrapper>
  ),
  suspected_fraud: (problem_type, order, isMinibarClosed) => (
    <ReportProblemFormWrapper
      order={order}
      problem_type={problem_type}
      isMinibarClosed={isMinibarClosed}>
      <FieldLabel key="suspected_fraud_label">{I18n.t('ui.modal.report_problem.label.suspected_fraud')}</FieldLabel>
      <FreeResponseField name="suspected_fraud"/>
    </ReportProblemFormWrapper>
  ),
  driver_unavailable: (problem_type, order, isMinibarClosed) => (
    <ReportProblemFormWrapper
      order={order}
      problem_type={problem_type}
      isMinibarClosed={isMinibarClosed}>
      <FieldLabel
        key="driver_unavailable_why_label">{I18n.t('ui.modal.report_problem.label.driver_unavailable_why')}</FieldLabel>
      <FreeResponseField name="driver_unavailable_why"/>
      {
        //TODO: DatePicker "When will your driver be available"
        //Comment Field -- If next day should we close you until then?
        //Message "we will contact the customer and let them know that it will either be rescheduled or canceled"
      }
    </ReportProblemFormWrapper>
  ),
  failed_delivery: (problem_type, order, isMinibarClosed) => (
    <ReportProblemFormWrapper
      order={order}
      problem_type={problem_type}
      isMinibarClosed={isMinibarClosed}>
      <FieldLabel key="failed_delivery_label">{I18n.t('ui.modal.report_problem.label.failed_delivery')}</FieldLabel>
      <FreeResponseField name="failed_delivery"/>
      {
        //TODO: Dropdown Failed Delivery reasons ("Customer wasn't present" "Doorman would not accept the order" "Address could not be found" "Customer refused delivery")
      }
    </ReportProblemFormWrapper>
  ),
  other: (problem_type, order, isMinibarClosed) => (
    <ReportProblemFormWrapper
      order={order}
      problem_type={problem_type}
      isMinibarClosed={isMinibarClosed}>
      <FieldLabel key="other_label">{I18n.t('ui.modal.report_problem.label.other')}</FieldLabel>
      <FreeResponseField name="other"/>
    </ReportProblemFormWrapper>
  )
};

const FieldLabel = ({children}) => <p className={style_sheet.fieldLabel}>{children}</p>;

const ReportProblemFormWrapperSTP = state => ({
  is_order_updating: order_selectors.isUpdating(state),
  is_comment_adding: comment_selectors.isFetching(state)
});
const ReportProblemFormWrapperDTP = {
  updateOrder: order_actions.updateOrder,
  addComment: comment_actions.addComment
};
const connectReportProblemFormWrapper = connect(ReportProblemFormWrapperSTP, ReportProblemFormWrapperDTP);
type ReportProblemFormWrapperProps = {
  problem_type: DeliveryMethodType,
  order: Order,
  isMinibarClosed: () => void,
  updateOrder: (string, Object) => void,
  addComment: (string, string) => void,
  is_order_updating: boolean,
  is_comment_adding: boolean,
  children: any
};
const ReportProblemFormWrapper = connectReportProblemFormWrapper(({
                                                                    problem_type,
                                                                    order,
                                                                    isMinibarClosed,
                                                                    updateOrder,
                                                                    addComment,
                                                                    is_order_updating,
                                                                    is_comment_adding,
                                                                    children
                                                                  }: ReportProblemFormWrapperProps) => {
  const handleSubmit = values => {
    const exception = {type: problem_type, description: problem_type, metadata: values};
    updateOrder(order.id, {state: 'exception', exception});
    addComment(order.id, exceptionComment(exception));
    isMinibarClosed();
  };
  const validateForm = fields => _.every(fields, 'value');
  return (
    <MBForm
      key={problem_type}
      onSubmit={handleSubmit}
      validateSubmittable={validateForm}
      className={style_sheet.reportProblemForm}>
      {children}
      <p className={style_sheet.formNote}>{I18n.t('ui.modal.report_problem.notify_minibar')}</p>
      <MBFormSubmitButton
        is_loading={is_order_updating || is_comment_adding}
        key="submit"
        text={I18n.t('ui.modal.report_problem.submit')}/>
    </MBForm>
  );
});

type ReportProblemFormProps = {
  problem_type: DeliveryMethodType,
  order: Order,
  isMinibarClosed: () => void
};
const ReportProblemForm = ({
                             problem_type,
                             order,
                             isMinibarClosed
                           }: ReportProblemFormProps) => {
  if (!problem_type) return null;
  return problem_forms[problem_type](problem_type, order, isMinibarClosed);
};

export default ReportProblemForm;
