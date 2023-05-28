// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import I18n from '../../../localization';
import type {Amounts, OrderItem} from '../../../business/order';
import {order_helpers} from '../../../business/order';
import MBTable from '../../elements/MBTable';
import style_sheet from './OrderDetail.module.css';
import OrderSubstitutesButton from './OrderSubstitutesButton';
import {supplierHasFeature} from '../../../business/session/selectors';

const {orderItemTableRow} = order_helpers;

const ORDER_ITEM_COLUMN_ORDER = ['quantity', 'product', 'substitute', 'unit_price', 'total'];
const ORDER_AMOUNTS_ROW_ORDER = ['delivery_fee', 'subtotal', 'store_discounts', 'minibar_promos', 'bottle_fee', 'tax_no_bottle_fee', 'tip', 'total'];
const COLUMN_WIDTH_MAP = {quantity: 1, product: 11, substitute: 1, unit_price: 2, total: 2};

type OrderItemListProps = { order_items: Array<OrderItem>, amounts: Amounts, hasSubstitutionFeature: boolean };

export class OrderItemList extends PureComponent<OrderItemListProps> {
  props: OrderItemListProps

  renderItemRow = (order_item: OrderItem, index: number) => {
    const {hasSubstitutionFeature} = this.props;
    const row_data = orderItemTableRow(order_item);
    return ( // NOTE: including index in key to show broken out duplicate skus in bud-e fridge edge case
      <MBTable.Row className={style_sheet.sectionRow} key={`${order_item.sku}row${index}`} selectable={false}>
        {ORDER_ITEM_COLUMN_ORDER.slice(0, 2)
          .map(col => <MBTable.Cell key={`${order_item.sku}${col}`}>{row_data[col]}</MBTable.Cell>)}
        {hasSubstitutionFeature ?
          <MBTable.Cell style={{width: '50px', maxWidth: '50px'}}><OrderSubstitutesButton
            order_item={order_item}/></MBTable.Cell> : null}
        {ORDER_ITEM_COLUMN_ORDER.slice(3)
          .map(col => <MBTable.Cell key={`${order_item.sku}${col}`}>{row_data[col]}</MBTable.Cell>)}
      </MBTable.Row>
    );
  }

  renderAmountRow = (amount_key: string) => (
    <MBTable.Row key={`${amount_key}row`} striped={false} selectable={false}>
      <MBTable.Cell/>
      <MBTable.Cell/>
      {this.props.hasSubstitutionFeature ? <MBTable.Cell/> : null}
      <MBTable.Cell key={`${amount_key}label`}
                    className={style_sheet.subHeader}>{I18n.t(`ui.table.${amount_key}`)}</MBTable.Cell>
      <MBTable.Cell key={`${amount_key}value`}>{I18n.l('currency', this.props.amounts[amount_key] || 0)}</MBTable.Cell>
    </MBTable.Row>
  );

  // TODO: i18n empty state
  render() {
    const {order_items, hasSubstitutionFeature} = this.props;
    return (
      <div className={style_sheet.flexRow}>
        <div className={style_sheet.infoItem}>
          <div className={style_sheet.sectionHeader}>
            <p className={style_sheet.sectionTitle}>{I18n.t('ui.header.items_ordered', {count: order_items.length})}</p>
          </div>
          <div className={style_sheet.sectionContents}>
            <MBTable.Table>
              <MBTable.Header>
                {ORDER_ITEM_COLUMN_ORDER.slice(0, 2).map(column_name =>
                  (<MBTable.HeaderCell width={COLUMN_WIDTH_MAP[column_name]} key={`${column_name}header`}>
                    {I18n.t(`ui.table.${column_name}`)}
                  </MBTable.HeaderCell>))}
                {hasSubstitutionFeature ? (
                  <MBTable.HeaderCell width={COLUMN_WIDTH_MAP[2]} key={'substituteheader'}>
                    {I18n.t('ui.table.substitute')}
                  </MBTable.HeaderCell>
                ) : null}
                {ORDER_ITEM_COLUMN_ORDER.slice(3).map(column_name =>
                  (<MBTable.HeaderCell width={COLUMN_WIDTH_MAP[column_name]} key={`${column_name}header`}>
                    {I18n.t(`ui.table.${column_name}`)}
                  </MBTable.HeaderCell>))}
              </MBTable.Header>
              <MBTable.Body>
                {order_items ? order_items.map(this.renderItemRow) : <h1>There Are No Order Items</h1>}
                {ORDER_AMOUNTS_ROW_ORDER.map(this.renderAmountRow)}
              </MBTable.Body>
            </MBTable.Table>
          </div>
        </div>
      </div>
    );
  }
}

const OrderItemListSTP = state => ({
  hasSubstitutionFeature: supplierHasFeature('Substitution')(state)
});

export default connect(OrderItemListSTP)(OrderItemList);
