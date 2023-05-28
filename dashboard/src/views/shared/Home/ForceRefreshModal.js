// @flow

import React from 'react';
import I18n from '../../../localization';
import MBModal from '../../elements/MBModal';
import MBButton from '../../elements/MBButton';

type ForceRefreshModalProps = {hidden: boolean};
const ForceRefreshModal = ({hidden}: ForceRefreshModalProps) => {
  if (hidden) return null;

  const forceRefresh = () => {
    window.location.reload(true);
  };

  return (
    <MBModal size="large" closeable={false}>
      <h3>{I18n.t('ui.modal.force_refresh.title')}</h3>
      <p>{I18n.t('ui.modal.force_refresh.body')}</p>
      <MBButton onClick={forceRefresh} size="large" expand>{I18n.t('ui.modal.force_refresh.reload')}</MBButton>
    </MBModal>
  );
};

export default ForceRefreshModal;
