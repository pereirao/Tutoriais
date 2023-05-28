// @flow

import React from 'react';
import {connect} from 'react-redux';
import {Dropdown} from 'semantic-ui-react';
import I18n from '../../../localization';
import {session_actions, session_selectors} from '../../../business/session';

import style_sheet from './MainNav.module.css';

const {myName} = session_selectors;
const {signOut} = session_actions;

type AccountLinkProps = { name: string, signMeOut: () => void };
export const AccountLink = ({name, signMeOut}: AccountLinkProps) => (
  <div>
    <Dropdown compact text={name}>
      <Dropdown.Menu className={style_sheet.accountLinkDropdownMenu}>
        <Dropdown.Item text="Sign Out" icon="log out" onClick={signMeOut}/>
      </Dropdown.Menu>
    </Dropdown>
    <p className={style_sheet.accountRole}>{I18n.t('ui.header.employee')}</p>
  </div>
);


const AccountLinkSTP = state => ({name: myName(state)});
const AccountLinkDTP = {signMeOut: signOut};
const AccountLinkContainer = connect(AccountLinkSTP, AccountLinkDTP)(AccountLink);

export default AccountLinkContainer;
