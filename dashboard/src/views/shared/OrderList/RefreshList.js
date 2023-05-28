// @flow

import React from 'react';
import I18n from '../../../localization';
import MBButton from '../../elements/MBButton';
import MBIcon from '../../elements/MBIcon';
import style_sheet from './OrderList.module.css';

type RefreshListProps = { visible: boolean, refresh: () => void };
const RefreshList = ({visible, refresh}: RefreshListProps) => {
  if (!visible) return null;
  return (
    <div className={style_sheet.refreshListWrapper}>
      <MBButton onClick={refresh} button_type="secondary" size="small">
        <p className={style_sheet.refreshButtonContents}>{I18n.t('ui.button.refresh')}</p>
        <MBIcon icon="refresh" size="small"/>
      </MBButton>
    </div>
  );
};

export default RefreshList;
