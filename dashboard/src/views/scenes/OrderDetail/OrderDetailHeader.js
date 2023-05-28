// @flow

import React from 'react';
import {Icon} from 'semantic-ui-react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';
import {goBack} from 'connected-react-router';
import I18n from '../../../localization';
import type Order from '../../../business/order';
import {order_helpers, order_selectors} from '../../../business/order';
import MBButton from '../../elements/MBButton';
import MBIcon from '../../elements/MBIcon';
import UpdateStateButton from '../../shared/UpdateStateButton';
import ReportProblemButton from './ReportProblemButton';
import style_sheet from './OrderDetail.module.css';
import {OrderAttribute} from '../../shared/OrderAttribute';

const cx = classNames.bind(style_sheet);

const {
  orderNumber,
  orderAttributes,
  deadlineTime,
  deadlineDate,
  isException,
  isGift,
  isTerminalState,
  isScheduledFor,
  isScheduledSoonNoStateFilter,
  giftMessage,
  deliveryMethodType,
  displayState,
  updateableFromDetail,
  receiptURL,
  orderStatusClass,
  trackingNumber,
  carrier
} = order_helpers;

type OrderDetailHeaderProps = { order: Order, isMinibarClosed: () => void };
const OrderDetailHeader = ({order, isMinibarClosed}: OrderDetailHeaderProps) => (
  <div>
    <NavigationRow order={order} print_url={receiptURL(order)}/>
    <SummaryRow order={order} isMinibarClosed={isMinibarClosed}/>
    <GiftDetails order={order}/>
  </div>
);


const NavigationRowDTP = {goBackRoute: goBack};
const connectNavigationRow = connect(null, NavigationRowDTP);

const NavigationRow = connectNavigationRow(({order, print_url, goBackRoute}) => (
  <div className={style_sheet.headerNav}>
    <span onClick={goBackRoute} className={style_sheet.backToOrderListLink}>
      <Icon name="chevron left"/>
      {I18n.t('ui.link.back_to_order_list')}
    </span>
    <MBButton
      button_type="tertiary"
      size="large"
      title={_.isEmpty(print_url) ? I18n.t('accessibility.title.generating_receipt') : I18n.t('accessibility.title.print_order')}
      onClick={() => {
        window.open(`../pdf_html/${order.id}`, '_newtab');
      }}>
      <MBIcon icon="print" color='mb_black'/>
      {I18n.t('ui.button.print')}
    </MBButton>
  </div>
));

const SummaryRowSTP = (state, {order}) => ({
  hasPendingSubstitutions: (order_selectors.pendingSubstitutionsByOrderId(order.id)(state) || []).length
});
type SummaryRowProps = { order: Order, isMinibarClosed: () => void, hasPendingSubstitutions: boolean };
const SummaryRow = connect(SummaryRowSTP)(({order, isMinibarClosed, hasPendingSubstitutions}: SummaryRowProps) => (
  <div className={style_sheet.summaryRow}>
    <div className={style_sheet.orderTitleWrapper}>
      <div className={style_sheet.flexRow}>
        <h2 className={style_sheet.orderTitle}>{I18n.t('ui.header.order_number', {number: orderNumber(order)})}</h2>
        <OrderAttribute attributes={orderAttributes(order)}
                        showSubstitutionOk={hasPendingSubstitutions || isException(order)}/>
      </div>
      <h3 className={cx('orderState', orderStatusClass(order))}>{displayState(order)}</h3>
      {(trackingNumber(order)) ? (
        <div className={style_sheet.trackInfo}>
          <p
            className={style_sheet.trackInfoRow}>{I18n.t('ui.header.tracking_number', {tracking_number: trackingNumber(order)})}</p>
          <p className={style_sheet.trackInfoRow}>{I18n.t('ui.header.carrier', {carrier: carrier(order)})}</p>
        </div>
      ) : null}
      <div className={style_sheet.buttonsWrapper}>
        {!hasPendingSubstitutions && <UpdateOrderButton order_id={order.id} visible={updateableFromDetail(order)}/>}
        <ReportProblemButton order={order} visible={!isTerminalState(order)} isMinibarClosed={isMinibarClosed}/>
      </div>
    </div>
    <div className={style_sheet.deadlineWrapper}>
      <p
        className={style_sheet.deadlineTitle}>{!isScheduledFor(order) ? I18n.t(`ui.header.deadline.${deliveryMethodType(order)}`) : I18n.t('ui.header.deadline.scheduled')}</p>
      <MBIcon icon={`${deliveryMethodType(order)}_deadline`} size="large" color="mb_dark_grey"/>
      <p className={style_sheet.deadlineTime}>{!isScheduledFor(order) ? deadlineTime(order) : deadlineDate(order)}</p>
      <p className={style_sheet.deadlineDate}>{!isScheduledFor(order) ? deadlineDate(order) : deadlineTime(order)}</p>
    </div>
  </div>
));

type UpdateOrderButtonProps = { order_id: number, visible: boolean };
const UpdateOrderButton = ({order_id, visible}: UpdateOrderButtonProps) => {
  if (!visible) return null;
  return (
    <div className={style_sheet.updateButtonWrapper}>
      <UpdateStateButton order_id={order_id}/>
    </div>
  );
};

// TODO: differentiate text if no gift note
type GiftDetailsProps = { order: Order };
const GiftDetails = ({order}: GiftDetailsProps) => {
  if (!isGift(order)) return null;
  return (
    <div className={style_sheet.giftDetailsWrapper}>
      <p className={style_sheet.giftHeader}>{I18n.t('ui.header.gift_header')}</p>
      <p className={style_sheet.giftMessage}>{giftMessage(order)}</p>
    </div>
  );
};
export default OrderDetailHeader;
