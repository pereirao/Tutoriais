//@flow

import React from 'react';
import style_sheet from './OrderAttributeIcons.module.css';
import MBIcon from '../../elements/MBIcon';
import I18n from '../../../localization';


type OrderAttributeIconsProps = { attributes: Array<string>, iconClassName?: Object, showSubstitutionOk: boolean };
const OrderAttributeIcons = ({attributes, iconClassName, showSubstitutionOk}: OrderAttributeIconsProps) => (
  <div className={style_sheet.attributeCell}>
    {attributes.filter(attribute => (
      (!showSubstitutionOk && attribute !== 'allow_substitution') || showSubstitutionOk
    )).map(attribute => (
      <MBIcon
        key={`${attribute}icon`}
        color={attribute === 'engraving' ? 'mb_white' : 'mb_medium_grey'}
        inline
        icon={attribute}
        strokeColor={attribute === 'engraving' ? '#A0A0A0' : 'none'}
        strokeWidth={attribute === 'engraving' ? '30' : 'none'}
        className={iconClassName || style_sheet.attributeIcon}
        title={I18n.t(`accessibility.icon.${attribute}`)}/>
    ))}
  </div>
);

export default OrderAttributeIcons;
