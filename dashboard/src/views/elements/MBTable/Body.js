import React from 'react';
import style_sheet from './MBTable.module.css';

const Body = ({children, ...body_props}) => (
  <tbody {...body_props} className={style_sheet.tableBody}>
  {children}
  </tbody>
);

export default Body;
