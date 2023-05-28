//@flow

import React from 'react';
import I18n from '../../../localization';

import shipped from './assets/box.png';
import pickup from './assets/bag.png';
import on_demand from './assets/truck.png';
import scheduled from './assets/clock.png';

const icon_map = { shipped, pickup, on_demand, scheduled };

type OrderTypeIconProps = {type: string};
const OrderTypeIcon = ({type}: OrderTypeIconProps) => (
  <img
    src={icon_map[type]}
    alt={I18n.t(`accessibility.icon.${type}`)} />
);

export default OrderTypeIcon;
