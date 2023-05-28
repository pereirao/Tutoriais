// @flow

import React from 'react';
import I18n from '../../../localization';
import MBModal from '../../elements/MBModal';
import NewNotificationMethodForm from './NewNotificationMethodForm';
import style_sheet from './Settings.module.css';

type NewNotificationMethodModalProps = { hidden: boolean, close: () => void };
const NewNotificationMethodModal = ({hidden, close}: NewNotificationMethodModalProps) => {
  if (hidden) return null;
  return (
    <MBModal close={close}>
      <h3 className={style_sheet.modalHeader}>{I18n.t('ui.modal.new_notification_method.title')}</h3>
      <NewNotificationMethodForm close={close}/>
    </MBModal>
  );
};

export default NewNotificationMethodModal;
