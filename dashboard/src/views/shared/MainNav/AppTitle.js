// @flow

import React, {PureComponent} from 'react';
import I18n from '../../../localization';
import MBButton from '../../elements/MBButton';
import HelpModal from '../HelpModal';
import MobileMenu from './MobileMenu';
import style_sheet from './MainNav.module.css';
import logo from './assets/minibar_logo@2x.png';
import hamburger_icon from './assets/hamburger.png';

type AppTitleProps = { current_path: string };
type AppTitleState = { is_help_modal_open: boolean, is_mobile_menu_open: boolean };

export class AppTitle extends PureComponent {
  props: AppTitleProps
  state: AppTitleState

  constructor(props) {
    super(props);
    this.state = {is_help_modal_open: false, is_mobile_menu_open: false};
    this.wrapperRef = React.createRef();
  }

  toggleHelpModal = () => {
    this.setState({is_help_modal_open: !this.state.is_help_modal_open});
  }

  toggleMobileMenu = () => {
    this.setState({is_mobile_menu_open: !this.state.is_mobile_menu_open});
    document.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (ev) => {
    const elementClasses = [...ev.target.classList];
    if (!elementClasses.some(cl => cl.includes('MainNav'))) {
      this.toggleMobileMenu();
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }

  render() {
    return (
      <div className={style_sheet.topBarLeft} ref={this.wrapperRef}>
        <img src={logo} className={style_sheet.logo} alt={I18n.t('accessibility.minibar_logo')}/>
        <div className={style_sheet.appTitleWrapper}>
          <p className={style_sheet.appTitle}>{I18n.t('ui.header.store_partners')}</p>
          <MBButton onClick={this.toggleHelpModal} button_type="link" size="large">
            <em>{I18n.t('ui.link.need_help')}</em>
          </MBButton>
        </div>
        <div onClick={this.toggleMobileMenu} className={style_sheet.hamburger}>
          <img src={hamburger_icon} alt={I18n.t('accessibility.icon.hamburger')}/>
        </div>
        <MobileMenu
          hidden={!this.state.is_mobile_menu_open}
          current_path={this.props.current_path}
          close={this.toggleMobileMenu}
          toggleHelpModal={this.toggleHelpModal}/>
        <HelpModal hidden={!this.state.is_help_modal_open} close={this.toggleHelpModal}/>
      </div>
    );
  }
}

export default AppTitle;
