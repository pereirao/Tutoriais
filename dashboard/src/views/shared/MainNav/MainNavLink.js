//@flow

import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';

import I18n from '../../../localization';
import style_sheet from './MainNav.module.css';
import NotificationCount from './NotificationCount';

const cx = classNames.bind(style_sheet);

type MainNavLinkProps = { current_path: string, route_name: string };
const MainNavLink = ({current_path, route_name}: MainNavLinkProps) => {
  const is_active = current_path.startsWith(`/${route_name}`) ||
    (route_name === 'orders' && current_path.startsWith('/order'));
  return (
    <Link
      to={`/${route_name}`}
      title={I18n.t(`accessibility.title.${route_name}`)}
      className={cx('navLink', {activeTab: is_active})}>
      {I18n.t(`ui.tab.${route_name}`)}
      {route_name === 'orders' && <NotificationCount/>}
    </Link>
  );
};

export default MainNavLink;
