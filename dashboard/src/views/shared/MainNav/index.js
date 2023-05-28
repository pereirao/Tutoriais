// @flow

import React, {PureComponent} from 'react';
import _ from 'lodash';
import Raven from 'raven-js';
import {connect} from 'react-redux';
import I18n from '../../../localization';
import {notification_selectors} from '../../../business/notification';
import {order_actions} from '../../../business/order';
import {session_actions} from '../../../business/session';
import style_sheet from './MainNav.module.css';
import TopBar from './TopBar';
import MainNavLink from './MainNavLink';
import StoreRating from './StoreRating';
import bing_bong_sound from './assets/bing_bong.mp3';
import black_favicon from './assets/favicon.ico';
import red_favicon from './assets/favicon-admin.ico';
import {MBButton} from '../../elements/MBButton';
import MBModal from '../../elements/MBModal';

const {totalCount} = notification_selectors;
export const MAIN_NAV_ROUTE_NAMES = ['orders', 'reports', 'inventory', 'settings'];

type MainNavProps = {
  location: Object,
  ping: () => void,
  fetchActive: () => void,
  notification_count: number
};
type MainNavState = {
  show_audio_permission_modal: boolean,
  has_audio_modal_been_shown: boolean
};

export class MainNav extends PureComponent {
  props: MainNavProps
  state: MainNavState
  bing_bong_audio: Object
  throb_interval: Object

  constructor(props) {
    super(props);
    this.props.ping();
    this.bing_bong_audio = new Audio(bing_bong_sound);
    this.registerIsActiveListener();
    this.updatePageTitle(props.notification_count);
    if (!_.isEmpty(props.notification_count)) this.alertNewNotification();
    this.state = {show_audio_permission_modal: false, has_audio_modal_been_shown: false};
  }

  registerIsActiveListener = () => {
    document.addEventListener('visibilitychange', () => {
      const hidden = _.get(document, 'visibilityState') === 'hidden';
      this.setFaviconThrob(hidden && this.props.notification_count > 0);
    });
  }

  componentWillReceiveProps(next_props) {
    if (next_props.notification_count === 0) {
      this.setFaviconThrob(false);
      this.updatePageTitle(next_props.notification_count);
    } else if (next_props.notification_count !== this.props.notification_count) {
      if (next_props.notification_count > this.props.notification_count) {
        this.alertNewNotification();
      }
      this.updatePageTitle(next_props.notification_count);
      next_props.fetchActive();
    }
  }

  updatePageTitle = (notification_count) => {
    const page_title = document.getElementById('dynamic-title');
    if (_.get(page_title, 'innerHTML')) page_title.innerHTML = I18n.t('system.page_title', {count: notification_count || 0});
  }

  alertNewNotification = () => {
    try {
      if (this.bing_bong_audio) {
        this.bing_bong_audio.play()
          .then(() => {
            this.setState({show_audio_permission_modal: false});
          })
          .catch(() => {
            this.setState({
              show_audio_permission_modal: !this.state.has_audio_modal_been_shown,
              has_audio_modal_been_shown: true
            });
          });
      }
    } catch (e) { // NOTE: audio.play() returns undefined for browsers that don't support web audio yet
      Raven.captureMessage('Browser does not support Audio.play()', {extra: {error: e}});
    }
    if (_.get(document, 'visibilityState') === 'hidden') this.setFaviconThrob(true);
  }

  setFaviconThrob = (should_throb) => {
    const favicon = document.getElementById('dynamic-favicon');
    if (should_throb) {
      let count = 0;
      this.throb_interval = setInterval(() => {
        const icon = count % 2 ? red_favicon : black_favicon; // if odd red, if even black
        favicon.setAttribute('href', icon);
        count += 1;
      }, 1000);
    } else {
      clearInterval(this.throb_interval);
      favicon.setAttribute('href', black_favicon);
    }
  }

  render() {
    const {location} = this.props;
    return (
      <div className={style_sheet.navWrapper}>
        <AudioPermissionModal
          hidden={!this.state.show_audio_permission_modal}
          alertNotification={this.alertNewNotification}
          closeModal={() => this.setState({show_audio_permission_modal: false})}/>
        <TopBar current_path={location.pathname}/>
        <div className={style_sheet.navMenu}>
          {MAIN_NAV_ROUTE_NAMES.map(route_name => (
            <MainNavLink key={`${route_name}link`} current_path={location.pathname} route_name={route_name}/>
          ))}
          <StoreRating/>
        </div>
      </div>
    );
  }
}

const AudioPermissionModal = ({hidden, closeModal, alertNotification}) => {
  if (hidden) return null;
  return (
    <MBModal close={closeModal}>
      <h3>{I18n.t('ui.modal.audio_permission.title')}</h3>
      <div className={style_sheet.buttonRow}>
        <MBButton expand button_type="secondary" size="large" onClick={closeModal}>
          {I18n.t('ui.modal.audio_permission.disable')}
        </MBButton>
        <div className={style_sheet.spacer}/>
        <MBButton expand size="large" onClick={alertNotification}>
          {I18n.t('ui.modal.audio_permission.ok')}
        </MBButton>
      </div>
    </MBModal>
  );
};

const MainNavSTP = state => ({notification_count: totalCount(state)});
const MainNavDTP = {ping: session_actions.ping, fetchActive: order_actions.fetchActive};
const MainNavContainer = connect(MainNavSTP, MainNavDTP)(MainNav);
export default MainNavContainer;
