// @flow

import React from 'react';
import I18n from '../../../localization';
import MBModal from '../../elements/MBModal';
import style_sheet from './MinibarClosedModal.module.css';

type MinibarClosedModalProps = { hidden: boolean, close: () => void };
const MinibarClosedModal = ({hidden, close}: MinibarClosedModalProps) => {
  if (hidden) return null;
  return (
    <MBModal close={close}>
      <h3 className={style_sheet.minibarClosedModalHeader}>{I18n.t('ui.modal.minibar_is_closed.title')}</h3>
      <p>{I18n.t('ui.modal.minibar_is_closed.text')}</p>
    </MBModal>
  );
};

export default MinibarClosedModal;
