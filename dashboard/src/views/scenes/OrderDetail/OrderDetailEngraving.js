// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import I18n from '../../../localization';
import type { OrderItem } from '../../../business/order';
import {order_helpers} from '../../../business/order';
import style_sheet from './OrderDetail.module.css';

const {orderItemEngravingData} = order_helpers;

type OrderDetailEngravingProps = { order_items: Array<OrderItem> };

export class OrderDetailEngraving extends PureComponent<OrderDetailEngravingProps> {
  props: OrderDetailEngravingProps

  renderItemData = (order_item: OrderItem, index: number) => {
    const row_data = orderItemEngravingData(order_item);
    return ( // NOTE: including index in key to show broken out duplicate skus in bud-e fridge edge case
      <div className={style_sheet.engravingItem}>
        <div className={style_sheet.engravingLineItem}><strong>{row_data.product}</strong></div>
        <div className={style_sheet.engravingLineItem}>Line 1: {row_data.item_options.line1}</div>
        <div className={style_sheet.engravingLineItem}>Line 2: {row_data.item_options.line2}</div>
      </div>
    );
  }

  // TODO: i18n empty state
  render() {
    const {order_items} = this.props;
    return (
      <div className={style_sheet.flexRow}>
        <div className={style_sheet.infoItem}>
          <div className={style_sheet.engravingContentsWrapper}>
            <div className={style_sheet.engravingTitle}>
              <p className={style_sheet.engravingTitleText}>{I18n.t('ui.header.engraving_ordered')}</p>
            </div>
            <div className={style_sheet.engravingContents}>
              {order_items ? order_items.map(this.renderItemData) : <h1>There Are No Order Items</h1>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const OrderDetailEngravingSTP = state => ({});

export default connect(OrderDetailEngravingSTP)(OrderDetailEngraving);
