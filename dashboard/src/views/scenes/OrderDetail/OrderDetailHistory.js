// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import I18n from '../../../localization';
import {order_helpers} from '../../../business/order';
import style_sheet from './OrderDetail.module.css';
import OrderTimeline from './OrderTimeline';
import OrderComments from './OrderComments';
import OrderExtras from './OrderExtras';
import {session_selectors} from '../../../business/session';

const {currentSupplier} = session_selectors;

const {
  commentIds
} = order_helpers;

export class OrderDetailHistoryModal extends PureComponent {
  render() {
    const {order, isMinibarClosed, supplier} = this.props;
    let extrasWrapper = (null);
    if (hasExtras(supplier)) {
      extrasWrapper = (
        <div className={style_sheet.extrasWrapper}>
          <div className={style_sheet.sectionHeader}><p
            className={style_sheet.sectionTitle}>{I18n.t('ui.header.order_extras')}</p></div>
          <div className={style_sheet.extrasSectionContents}>
            <OrderExtras order={order}/>
          </div>
        </div>
      );
    }
    return (
      <div className={style_sheet.flexRow}>
        <div className={style_sheet.timelineWrapper}>
          <div className={style_sheet.sectionHeader}><p
            className={style_sheet.sectionTitle}>{I18n.t('ui.header.order_timeline')}</p></div>
          <div className={style_sheet.sectionContents}>
            <OrderTimeline order={order}/>
          </div>
        </div>
        <div className={style_sheet.commentsWrapper}>
          <div className={style_sheet.sectionHeader}><p
            className={style_sheet.sectionTitle}>{I18n.t('ui.header.order_comments')}</p></div>
          <div className={style_sheet.commentSectionContents}>
            <OrderComments order_id={order.id} isMinibarClosed={isMinibarClosed} comment_ids={commentIds(order)}/>
          </div>
        </div>
        {extrasWrapper}
      </div>
    );
  }
}

function hasExtras(supplier) {
  return supplier.partner_config &&
    supplier.partner_config.extrasForm &&
    supplier.partner_config.extrasForm.fields &&
    supplier.partner_config.extrasForm.fields.length > 0;
}

const OrderDetailHistorySTP = state => {
  return ({
    supplier: currentSupplier(state)
  });
};

export const OrderDetailHistory = connect(OrderDetailHistorySTP)(OrderDetailHistoryModal);


export default OrderDetailHistory;
