// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as Ent from '@minibar/store-business/src/utils/ent';
import type {Adjustment} from '../../../business/adjustment';
import {adjustment_actions, adjustment_selectors, adjustment_helpers} from '../../../business/adjustment';
import I18n from '../../../localization';
import MBTable from '../../elements/MBTable';
import style_sheet from './OrderDetail.module.css';

const {tableRow} = adjustment_helpers;

const ADJUSTMENTS_COLUMN_ORDER = ['time', 'date', 'reason', 'adjustment'];

type OrderAdjustmentListProps = {
  order_id: string,
  adjustment_ids: Array<number>,
  adjustments: Array<Adjustment>,
  fetchAdjustments: (Array<number>) => void,
  is_fetching: boolean
};

export class OrderAdjustmentList extends PureComponent {
  props: OrderAdjustmentListProps

  componentWillMount() {
    this.props.fetchAdjustments(this.props.order_id);
  }

  renderRow = adjustment => {
    const row_data = tableRow(adjustment);
    return ([
      <MBTable.Row key={`${adjustment.id}row`} selectable={false}>
        {ADJUSTMENTS_COLUMN_ORDER.map(col => (
          <MBTable.Cell key={`${adjustment.id}${col}`}>{row_data[col]}</MBTable.Cell>
        ))}
      </MBTable.Row>,
      <MBTable.Row key={`${adjustment.id}subrow1`} selectable={false}>
        <MBTable.Cell
          colSpan={ADJUSTMENTS_COLUMN_ORDER.length}
          key={`${adjustment.id}_adjustment_description`}>
          {I18n.t('ui.table.description')} {row_data.description}
        </MBTable.Cell>
      </MBTable.Row>
    ]);
  }

  render() {
    const {adjustment_ids, adjustments, is_fetching} = this.props;
    // TODO: real loading state
    if (is_fetching) return <div>LOADING ...</div>;
    if (_.isEmpty(adjustment_ids)) return null;
    return (
      <div className={style_sheet.infoRow}>
        <div className={style_sheet.infoItem}>
          <div className={style_sheet.sectionHeader}>
            <p className={style_sheet.sectionTitle}>{I18n.t('ui.header.order_adjustments')}</p>
          </div>
          <div className={style_sheet.sectionContents}>
            <MBTable.Table>
              <MBTable.Header>
                {ADJUSTMENTS_COLUMN_ORDER.map(column_name => <MBTable.HeaderCell
                  key={`${column_name}header`}>{I18n.t(`ui.table.${column_name}`)}</MBTable.HeaderCell>)}
              </MBTable.Header>
              <MBTable.Body>
                {adjustments.map(this.renderRow)}
              </MBTable.Body>
            </MBTable.Table>
          </div>
        </div>
      </div>
    );
  }
}

const OrderAdjustmentListSTP = () => {
  const findAdjustment = Ent.find('adjustment');
  return (state, {adjustment_ids}) => {
    return {
      adjustments: findAdjustment(state, adjustment_ids),
      is_fetching: adjustment_selectors.isFetching(state)
    };
  };
};
const OrderAdjustmentListDTP = {fetchAdjustments: adjustment_actions.fetchAdjustments};
const OrderAdjustmentListContainer = connect(OrderAdjustmentListSTP, OrderAdjustmentListDTP)(OrderAdjustmentList);
export default OrderAdjustmentListContainer;
