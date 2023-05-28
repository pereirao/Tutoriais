//@flow

import React from 'react';
import classNames from 'classnames/bind';
import I18n from '../../../localization';

import style_sheet from './DeliveryMethodIcon.module.css';

import pickup from './assets/bag.png';
import shipped from './assets/box.png';
import on_demand from './assets/truck.png';

const cx = classNames.bind(style_sheet);
const icon_map = {pickup, shipped, on_demand};

type DeliveryMethodIconProps = { type: string, inline: boolean };
const DeliveryMethodIcon = ({type, inline = false}: DeliveryMethodIconProps) => (
  <img
    src={icon_map[type]}
    className={cx('deliveryMethodIcon', {inline})}
    alt={I18n.t(`accessibility.icon.${type}`)}/>
);

export default DeliveryMethodIcon;
