// @flow

import React, {PureComponent} from 'react';
import classNames from 'classnames/bind';
import style_sheet from './MBModal.module.css';

const cx = classNames.bind(style_sheet);

type MBModalProps = { close: () => void, size: string, closeable: boolean, children: any };

class MBModal extends PureComponent {
  props: MBModalProps
  static defaultProps = {size: 'medium', closeable: true}

  componentWillMount() {
    const body_el = document.getElementById('body');
    if (body_el) body_el.style.overflow = 'hidden';
    // document.ontouchmove = e => { e.preventDefault(); }; // Disable scrolling. FIXME: currently breaks mobile dropdown select
  }

  componentWillUnmount() {
    const body_el = document.getElementById('body');
    if (body_el) body_el.style.overflow = 'auto';
    // document.ontouchmove = _e => { return true; }; // Enable scrolling. FIXME: currently breaks mobile dropdown select
  }

  handleOverlayClick = (e) => {
    e.preventDefault();
    if (this.props.closeable) this.props.close();
  };

  render() {
    const {close, size, closeable, children} = this.props;
    return (
      <div className={style_sheet.container}>
        <div className={cx('modalWrapper', size)}>
          {
            closeable &&
            <span
              onClick={close}
              role="button"
              tabIndex="0"
              className={style_sheet.closeWrapper}>
              <CloseIcon/>
            </span>
          }
          {children}
        </div>
        <div className={style_sheet.overlay} role="presentation" onClick={this.handleOverlayClick}/>
      </div>
    );
  }
}

const CloseIcon = () => (
  <svg className={style_sheet.closeIcon} height="16px" width="16px" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <line x1="1" y1="11" x2="11" y2="1" stroke="#781214" strokeWidth="2"/>
    <line x1="1" y1="1" x2="11" y2="11" stroke="#781214" strokeWidth="2"/>
  </svg>
);

export default MBModal;
