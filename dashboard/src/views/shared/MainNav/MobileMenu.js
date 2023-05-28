// @flow

import React from 'react';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import I18n from '../../../localization';
import MBButton from '../../elements/MBButton';
import StoreRating from './StoreRating';
import {MAIN_NAV_ROUTE_NAMES} from './index';
import NotificationCount from './NotificationCount';
import style_sheet from './MainNav.module.css';


const cx = classNames.bind(style_sheet);

export const MobileMenu = ({hidden, current_path, pushRoute, close, toggleHelpModal}) => {
  if (hidden) return null;

  const handlePressLink = (route_name) => {
    if (!current_path.startsWith(`/${route_name}`)) {
      pushRoute(`/${route_name}`);
      close();
    }
  };

  return (
    <div className={style_sheet.mobileMenuWrapper}>
      <ul className={style_sheet.mobileMenuLinks}>
        {MAIN_NAV_ROUTE_NAMES.map(route_name => (
          <li
            key={`${route_name}link`}
            onClick={() => handlePressLink(route_name)}
            className={cx('mobileMenuLink', {activeLink: current_path.startsWith(`/${route_name}`)})}>
            {I18n.t(`ui.tab.${route_name}`)}
            {route_name === 'orders' && <NotificationCount/>}
          </li>
        ))}
      </ul>
      <div className={style_sheet.mobileMenuFooter}>
        <StoreRating/>
        <MBButton onClick={toggleHelpModal} button_type="link">
          <em>{I18n.t('ui.link.need_help')}</em>
        </MBButton>
      </div>
    </div>
  );
};

const MobileMenuDTP = {pushRoute: push};
const MobileMenuContainer = connect(null, MobileMenuDTP)(MobileMenu);

export default MobileMenuContainer;
