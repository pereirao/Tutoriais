// @flow

import React from 'react';
import AccountLink from './AccountLink';
import StoreTitle from './StoreTitle';
import AppTitle from './AppTitle';
import style_sheet from './MainNav.module.css';

type TopBarProps = { current_path: string };
const TopBar = ({current_path}: TopBarProps) => (
  <div className={style_sheet.topBarWrapper}>
    <AppTitle current_path={current_path}/>
    <StoreTitle/>
    <AccountLink/>
  </div>
);


export default TopBar;
