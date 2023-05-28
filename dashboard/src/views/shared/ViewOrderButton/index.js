// @flow

import React from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import classNames from 'classnames/bind';
import I18n from '../../../localization';
import style_sheet from './ViewOrderButton.module.css';

const cx = classNames.bind(style_sheet);

type ViewOrderButtonProps = { order_id: string, pushRoute: (string) => void, inline: boolean, onClick: () => void };
export const ViewOrderButton = ({
                                  order_id, pushRoute, inline = false, onClick = () => {
  }
                                }: ViewOrderButtonProps) => (
  <div
    className={cx('viewOrderButton', {inline})}
    title={I18n.t('accessibility.title.view_order')}
    onClick={e => {
      e.preventDefault();
      e.stopPropagation();
      pushRoute(`/order/${order_id}`);
      onClick();
    }}>
    <p className={style_sheet.mainText}>{I18n.t('ui.button.view')}</p>
  </div>
);

const ViewOrderButtonDTP = {pushRoute: push};
const ViewOrderButtonContainer = connect(null, ViewOrderButtonDTP)(ViewOrderButton);

export default ViewOrderButtonContainer;
