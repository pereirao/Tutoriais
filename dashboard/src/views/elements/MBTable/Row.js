import React from 'react';
import classNames from 'classnames/bind';
import style_sheet from './MBTable.module.css';

const cx = classNames.bind(style_sheet);

const Row = ({children, striped = true, selectable = false, ...row_props}) => (
  <tr className={cx({tableRow: true, striped, selectable})} {...row_props}>
    {children}
  </tr>
);

export default Row;
