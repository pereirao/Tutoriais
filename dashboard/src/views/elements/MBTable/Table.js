import React from 'react';
import style_sheet from './MBTable.module.css';

const Table = ({children, ...table_props}) => (
  <table className={style_sheet.tableContainer} {...table_props}>
    {children}
  </table>
);

export default Table;
