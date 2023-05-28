// @flow

import React from 'react';
import classNames from 'classnames/bind';
import style_sheet from './MBTooltip.module.css';

const cx = classNames.bind(style_sheet);

type TooltipPositioning = 'top' | 'right' | 'bottom' | 'left';
type MBTooltipProps = { size: string, visible: boolean, positioning: TooltipPositioning, children: any };
const MBTooltip = ({size = 'medium', visible, positioning = 'bottom', children}: MBTooltipProps) => {
  if (!visible) return null;
  return (
    <div className={cx('tooltip', size, positioning)}>
      {children}
    </div>
  );
};

export default MBTooltip;
