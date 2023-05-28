//@flow

import React from 'react';
import classNames from 'classnames/bind';
import style_sheet from './MBRadioOption.module.css';

const cx = classNames.bind(style_sheet);

type RadioOptionProps = { toggleOption: () => void, active: boolean, children: any };
const RadioOption = ({toggleOption, active, children}: RadioOptionProps) => (
  <div onClick={toggleOption} className={cx({radioButton: true, active})}>
    {children}
  </div>
);

export default RadioOption;
