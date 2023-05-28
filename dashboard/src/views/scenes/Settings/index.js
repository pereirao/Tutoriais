// @flow

import React from 'react';
import Break from './Break';
import EmployeeList from './EmployeeList';
import NotificationMethodList from './NotificationMethodList';
import style_sheet from './Settings.module.css';

const Settings = () => (
  <div className={style_sheet.sceneWrapper}>
    <h2>Breaks</h2>
    <Break/>
    <h2>Employees</h2>
    <EmployeeList/>
    <h2>Notification Methods</h2>
    <NotificationMethodList/>
  </div>
);

export default Settings;
