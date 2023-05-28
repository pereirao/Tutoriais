// @flow

import React from 'react';
import classNames from 'classnames/bind';
import MBLoader from '../MBLoader';
import style_sheet from './MBButton.module.css';

const cx = classNames.bind(style_sheet);

type ButtonType = "primary" | "secondary" | "tertiary" | "link";
type ButtonSize = "small" | "medium" | "large";

type MBButtonProps = {
  button_type?: ButtonType,
  className?: string,
  classNames?: Array,
  size?: ButtonSize,
  expand?: boolean,
  disabled?: boolean,
  is_loading?: boolean,
  children: ReactClass<*>
};
export const MBButton = ({
                           button_type = 'primary',
                           size = 'medium',
                           className = '',
                           expand = false,
                           disabled = false,
                           is_loading = false,
                           children,
                           ...button_props
                         }: MBButtonProps) => {
  const handleClick = () => {
    if (!(is_loading || disabled) && button_props.onClick) button_props.onClick();
  };
  const css_classes = className.split(' ');
  return (
    <div className={cx('button_wrapper', {expand})}>
      <div
        className={cx('button', button_type, ...css_classes, size, {disabled})}
        {...button_props}
        onClick={handleClick}>
        {is_loading ? <MBLoader type="spinner"/> : children}
      </div>
    </div>
  );
};

export default MBButton;
