// @flow

import React from 'react';
import type Order from '../../../business/order';
import I18n from '../../../localization';
import MBModal from '../../elements/MBModal';
import ReportProblemModalContents from './ReportProblemModalContents';
import style_sheet from './ReportProblemModal.module.css';

type ReportProblemModalProps = { hidden: boolean, order: Order, close: () => void, isMinibarClosed: () => void };
const ReportProblemModal = ({hidden, order, close, isMinibarClosed}: ReportProblemModalProps) => {
  if (hidden) return null;
  return (
    <MBModal close={close}>
      <h3 className={style_sheet.reportProblemModalHeader}>{I18n.t('ui.modal.report_problem.title')}</h3>
      <ReportProblemModalContents order={order} isMinibarClosed={isMinibarClosed}/>
    </MBModal>
  );
};

export default ReportProblemModal;
