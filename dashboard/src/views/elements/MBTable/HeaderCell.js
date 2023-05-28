import React from 'react';
import classNames from 'classnames/bind';
import style_sheet from './MBTable.module.css';

const cx = classNames.bind(style_sheet);

const HeaderCell = ({children, mobile_only, mobile_hidden, ...header_cell_props}) => (
  <th className={cx('tableCell', {mobileOnly: mobile_only, mobileHidden: mobile_hidden})} {...header_cell_props}>
    {children}
  </th>
);

export default HeaderCell;
