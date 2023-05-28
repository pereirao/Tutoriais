//@flow

import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import style_sheet from './MBLoader.module.css';

const cx = classNames.bind(style_sheet);

type MBLoaderType = 'dots' | 'spinner';
type MBLoaderSize = 'small' | 'large';
type MBLoaderProps = { type: MBLoaderType, size: MBLoaderSize };
const MBLoader = ({type = 'dots', size = 'small', ...wrapper_props}: MBLoaderProps) => {
  const renderContents = () => {
    switch (type) {
      case 'dots':
        return _.range(6).map(i => <span key={`loader_dot${i}`}> ●</span>);
      default:
        return null;
    }
  };

  const wrapperClass = cx({loaderWrapper: true, [type]: true, [size]: true});
  return (
    <div className={wrapperClass} {...wrapper_props}>
      {renderContents()}
    </div>
  );
};
export default MBLoader;
