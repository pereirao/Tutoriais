// @flow

import React from 'react';
import NewEmployeeForm from './NewEmployeeForm';
import style_sheet from './Settings.module.css';
import I18n from '../../../localization';
import MBModal from '../../elements/MBModal';

type NewEmployeeModalProps = {
  hidden: boolean,
  close: () => void
};

const NewEmployeeModal = ({hidden, close}: NewEmployeeModalProps) => {
  if (hidden) return null;
  return (
    <MBModal close={close}>
      <h3 className={style_sheet.modalHeader}>{I18n.t('ui.modal.new_employee.title')}</h3>
      <NewEmployeeForm close={close}/>
    </MBModal>
  );
};

export default NewEmployeeModal;
