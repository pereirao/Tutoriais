import React from 'react';
import style_sheet from './MBTable.module.css';


const Header = ({children}) => (
  <thead>
  <tr className={style_sheet.tableHeaderRow}>
    {children}
  </tr>
  </thead>
);

export default Header;
