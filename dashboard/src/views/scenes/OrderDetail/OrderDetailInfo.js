// @flow

import _ from 'lodash';
import React from 'react';
import I18n from '../../../localization';
import type Order from '../../../business/order';
import {order_helpers} from '../../../business/order';
import style_sheet from './OrderDetail.module.css';
import OrderDetailInfoMapLinks from './OrderDetailInfoMapLinks';

const {
  cardDetails,
  customerName,
  customerNotes,
  recipientName,
  formattedAddress,
  addressLocation,
  customerBirthdate,
  recipientPhone,
  deliveryMethodType
} = order_helpers;

type OrderDetailInfoProps = { order: Order };
const OrderDetailInfo = ({order}: OrderDetailInfoProps) => (
  <div className={style_sheet.infoRow}>
    <div className={style_sheet.infoItem}>
      <div className={style_sheet.sectionHeader}><p
        className={style_sheet.sectionTitle}>{I18n.t(`ui.header.recipient.${deliveryMethodType(order)}`)}</p></div>
      <div className={style_sheet.infoItemContents}>
        <p className={style_sheet.recipientName}>{recipientName(order)}</p>
        <OrderAddress formatted_address={formattedAddress(order)} address_location={addressLocation(order)}/>
        <p>{recipientPhone(order)}</p>
      </div>
    </div>
    <div className={style_sheet.infoItem}>
      <div className={style_sheet.sectionHeader}><p
        className={style_sheet.sectionTitle}>{I18n.t('ui.header.ordered_by')}</p></div>
      <div className={style_sheet.infoItemContents}>
        <p>{customerName(order)}</p>
        <p>{cardDetails(order)}</p>
        {getBirthDate(order)}
      </div>
    </div>
    <CustomerNotesSection notes={customerNotes(order)}/>
  </div>
);
const getBirthDate = order => {
  if (order.birthdate) {
    return (
      <p>Birthdate: {customerBirthdate(order)}</p>
    );
  }
  return undefined;
};

type OrderAddressProps = { formatted_address?: { [main_text]: string, [secondary_text]: string, [latitude]: float, [longitude]: float }, address_location?: { [latitude]: float, [longitude]: float } };
export const OrderAddress = ({formatted_address, address_location}: OrderAddressProps) => {
  if (!formatted_address) return null;

  return (
    <div className={style_sheet.addressLineWrapper}>
      <p className={style_sheet.addressLine}>{formatted_address.main_text}</p>
      <p className={style_sheet.addressLine}>{formatted_address.secondary_text}</p>
      <OrderDetailInfoMapLinks coords={address_location}/>
    </div>
  );
};

type CustomerNotesSectionProps = { notes: string };
export const CustomerNotesSection = ({notes}: CustomerNotesSectionProps) => {
  if (_.isEmpty(notes)) return null;
  return (
    <div className={style_sheet.infoItem}>
      <div className={style_sheet.sectionHeader}><p
        className={style_sheet.sectionTitle}>{I18n.t('ui.header.customer_notes')}</p></div>
      <div className={style_sheet.infoItemContents}>
        <p>{notes}</p>
      </div>
    </div>
  );
};
export default OrderDetailInfo;
