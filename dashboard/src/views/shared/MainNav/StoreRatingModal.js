// @flow

import React from 'react';
// import _ from 'lodash';
import classNames from 'classnames/bind';
import I18n from '../../../localization';
import {session_helpers} from '../../../business/session';
import MBModal from '../../elements/MBModal';
import style_sheet from './MainNav.module.css';

const {ratingClass} = session_helpers;
const cx = classNames.bind(style_sheet);

type StoreRatingModalProps = { rating: number, hidden: boolean, close: () => void };
const StoreRatingModal = ({rating, hidden, close}: StoreRatingModalProps) => {
  if (hidden) return null;

  const rating_class = ratingClass(rating);

  return (
    <MBModal close={close}>
      <div className={style_sheet.storeRatingModalWrapper}>
        <h3 className={style_sheet.storeRatingTitle}>{I18n.t('ui.modal.store_rating.title')}</h3>
        <p className={style_sheet.storeRatingBody}>{I18n.t('ui.modal.store_rating.message')}</p>
        <div className={style_sheet.modalRatingWrapper}>
          <h3 className={cx('storeRatingLarge', rating_class)}>{rating}</h3>
          <h3 className={cx('storeRatingSubtext', rating_class)}>{I18n.t(`ui.modal.store_rating.${rating_class}`)}</h3>
        </div>
        <p className={style_sheet.storeRatingBody}>{I18n.t('ui.modal.store_rating.goal')}</p>
      </div>
    </MBModal>
  );
};

export default StoreRatingModal;
