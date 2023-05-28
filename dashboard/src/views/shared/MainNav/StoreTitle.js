// @flow

import React from 'react';
import {connect} from 'react-redux';
import {session_helpers, session_selectors} from '../../../business/session';

import style_sheet from './MainNav.module.css';

const {supplierOpenMessage} = session_helpers;
const {supplierName, shippingMethods} = session_selectors;

type StoreTitleProps = { supplier_name?: string, delivery_info?: string };
export const StoreTitle = ({supplier_name, delivery_info}: StoreTitleProps) => (
  <div className={style_sheet.storeTitleWrapper}>
    <h1 className={style_sheet.storeTitle}>{supplier_name}</h1>
    <p className={style_sheet.storeSubTitle}>{delivery_info}</p>
  </div>
);

const StoreTitleSTP = state => ({
  supplier_name: supplierName(state),
  delivery_info: supplierOpenMessage(shippingMethods(state))
});
const StoreTitleContainer = connect(StoreTitleSTP)(StoreTitle);

export default StoreTitleContainer;
