import React from 'react';
import classNames from 'classnames/bind';
import style_sheet from './MBTable.module.css';

const cx = classNames.bind(style_sheet);

const Cell = ({children, mobile_only, mobile_hidden, ...cell_props}) => (
  <td className={cx('tableCell', {mobileOnly: mobile_only, mobileHidden: mobile_hidden})} {...cell_props}>
    {children}
  </td>
);

export default Cell;
