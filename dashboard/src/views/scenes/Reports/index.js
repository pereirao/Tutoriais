// @flow

import React from 'react';
import ReportList from './ReportList';
import style_sheet from './Report.module.css';

const Reports = () => {
  return (
    <div className={style_sheet.sceneWrapper}>
      <ReportList/>
    </div>
  );
};

export default Reports;
