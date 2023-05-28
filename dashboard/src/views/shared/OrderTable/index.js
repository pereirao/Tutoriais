//@flow

import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import classNames from 'classnames/bind';
import type Order from '../../../business/order';
import {order_helpers, order_selectors} from '../../../business/order';
import I18n from '../../../localization';
import MBTable from '../../elements/MBTable';
import MBIcon from '../../elements/MBIcon';
import OrderAttributeIcons from '../../shared/OrderAttributeIcons';
import ViewOrderButton from '../../shared/ViewOrderButton';
import UpdateStateButton from '../../shared/UpdateStateButton';
import style_sheet from './OrderTable.module.css';

const cx = classNames.bind(style_sheet);
const {orderTableRow, isException} = order_helpers;

const ORDERS_COLUMN_ORDER = ['mobile_summary', 'recipient', 'status', 'method', 'time', 'amount', 'attributes'];

// TODO: add loading state at so that it is clear things are updating if loading && isEmpty(orders)
type OrderTableProps = { orders: Array<Order>, pushRoute: (string) => void, updateable: boolean };
export const OrderTable = ({orders, pushRoute, updateable = false}: OrderTableProps) => {
  const column_order = updateable ? [...ORDERS_COLUMN_ORDER, 'update_state'] : ORDERS_COLUMN_ORDER;

  const RenderRowSTP = (state, {order}) => ({
    hasPendingSubstitutions: (order_selectors.pendingSubstitutionsByOrderId(order.id)(state) || []).length
  });
  type RenderRowProps = { order: Order, hasPendingSubstitutions: boolean };
  const RenderRow = connect(RenderRowSTP)(({order, hasPendingSubstitutions}: RenderRowProps) => {
    const row_data = orderTableRow(order);
    const exception = isException(order);
    return (
      <MBTable.Row selectable key={`${order.id}row`} onClick={() => pushRoute(`/order/${order.id}`)}>
        {column_order.map(col => (
          <MBTable.Cell
            mobile_only={col === 'mobile_summary'}
            mobile_hidden={col !== 'mobile_summary'}
            key={`${order.id}${col}`}>
            {formatCellDatum(col, row_data, hasPendingSubstitutions || exception)}
          </MBTable.Cell>
        ))}
      </MBTable.Row>
    );
  });

  const formatCellDatum = (col, row, showSubstitutionOkIcon) => {
    switch (col) {
      case 'status': {
        return <p className={cx('orderStatus', row.status.class)}>{row[col].text}</p>;
      }
      case 'method':
        return <DeliveryMethod type={row[col]} tracking={row.tracking_number} status={row.status}/>;
      case 'attributes':
        return <OrderAttributeIcons attributes={row.attributes} showSubstitutionOk={showSubstitutionOkIcon}/>;
      case 'update_state': {
        return (
          <div className={style_sheet.listButtonWrapper}>
            {row[col].updateable ? <UpdateStateButton inline order_id={row[col].id}/> :
              <ViewOrderButton inline order_id={row[col].id}/>}
          </div>
        );
      }
      case 'mobile_summary': {
        return (
          <div className={style_sheet.mobileSummaryWrapper}>
            <div className={style_sheet.mobileSummaryLeft}>
              <p className={style_sheet.mobileSummaryMain}>{`${row.recipient} - ${row.amount}`}</p>
              <div className={style_sheet.mobileSummarySecondary}>
                <MBIcon icon={row.method} color="mb_medium_grey" inline size="small"
                        className={style_sheet.deliveryMethodIconMobile}/>
                {row.time}
              </div>
            </div>
            <div className={style_sheet.mobileSummaryRight}>
              <p className={cx('mobileSummaryStatus', 'orderStatus', row.status.class)}>{row.status.text}</p>
              <OrderAttributeIcons attributes={row.attributes} showSubstitutionOk={showSubstitutionOkIcon}/>
            </div>
          </div>
        );
      }
      default:
        return <p className={cx('cellDatum', `${_.camelCase(col)}Cell`)}>{row[col]}</p>;
    }
  };

  // TODO: real empty state
  return (
    <MBTable.Table>
      <MBTable.Header key="header_row">
        {column_order.map(col => {
          if (col === 'mobile_summary') return null; // no header for mobile summary column
          return (
            <MBTable.HeaderCell mobile_hidden key={`${col}header`}>
              {I18n.t(`ui.table.${col}`)}
            </MBTable.HeaderCell>
          );
        })}
      </MBTable.Header>
      <MBTable.Body>
        {_.some(orders) && orders.map(order => <RenderRow order={order}/>)}
      </MBTable.Body>
    </MBTable.Table>
  );
};

const DeliveryMethod = ({type, tracking, status}) => {
  const statusText = status && status.text && status.text.toLowerCase();
  const iconType = type === 'shipped' && statusText === 'confirmed' && !tracking ? 'shipped_alert' : type;
  return (
    <div className={style_sheet.deliveryMethod}>
      <MBIcon icon={iconType} color={iconType === 'shipped_alert' ? 'mb_red' : 'mb_medium_grey'}
              viewBox={iconType === 'shipped_alert' ? '0 0 22 24' : '0 0 1024 1024'}
              className={style_sheet.deliveryMethodIcon}/>
      <p>{I18n.t(`ui.table.method_type.${type}`)} {tracking ? (
        <small>- {I18n.t('ui.table.tracking')}: {tracking}</small>) : null}</p>
    </div>
  );
};

const OrderTableDTP = {pushRoute: push};
const OrderTableContainer = connect(null, OrderTableDTP)(OrderTable);

export default OrderTableContainer;
