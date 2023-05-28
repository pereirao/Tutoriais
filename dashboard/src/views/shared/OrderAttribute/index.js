//@flow

import React from 'react';
import style_sheet from './OrderAttribute.module.css';
import I18n from '../../../localization';

type OrderAttributeProps = { attributes: Array<string>, showSubstitutionOk: boolean };
export const OrderAttribute = ({attributes, showSubstitutionOk}: OrderAttributeProps) => (
  <div className={style_sheet.container}>
    {attributes.filter(attribute => (
      (!showSubstitutionOk && attribute !== 'allow_substitution') || showSubstitutionOk
    )).map(attribute => (
      <div className={style_sheet.attributeItem}>
        {I18n.t(`accessibility.icon.${attribute}`)}
      </div>
    ))}
  </div>
);
