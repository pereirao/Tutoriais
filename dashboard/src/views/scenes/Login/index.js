// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import classNames from 'classnames/bind';
import _ from 'lodash';
import {session_actions, session_selectors} from '../../../business/session';
import {MBForm, MBFormSubmitButton} from '../../elements/MBForm';
import {
  EmailField,
  PasswordField
} from '../../shared/form_fields';
import I18n from '../../../localization';
import style_sheet from './Login.module.css';
import logo from './assets/minibar_logo.png';

const cx = classNames.bind(style_sheet);

type LoginProps = {
  authenticate: () => void,
  is_logged_in: boolean,
  location: Object,
  is_loading: boolean,
  login_error: string,
  clearLoginError: () => void
};

// TODO: HOC for screen lock
export class Login extends PureComponent {
  props: LoginProps

  componentWillMount() {
    const body_el = document.getElementById('body');
    if (body_el) body_el.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    const body_el = document.getElementById('body');
    if (body_el) body_el.style.overflow = 'auto';
  }

  render() {
    const {authenticate, is_logged_in, location, is_loading, login_error, clearLoginError} = this.props;
    if (is_logged_in) return <Redirect to={{pathname: '/orders', state: {from: location}}}/>;
    const handleSubmit = () => login_error && clearLoginError();
    return (
      <div>
        <div className={style_sheet.wrapper}>
          <div className={style_sheet.slidingBackground}/>
        </div>
        <div className={cx('panelWrapper', {shake: !_.isEmpty(login_error)})}>
          <div className={style_sheet.panel}>
            <MBForm onSubmit={authenticate} className={style_sheet.formWrapper}>
              <img className={style_sheet.logo} src={logo} alt={I18n.t('accessibility.minibar_logo')}/>
              <EmailField/>
              <PasswordField submit_on_enter/>
              <LoginError error_message={login_error}/>
              <MBFormSubmitButton
                is_loading={is_loading}
                inverted
                onClick={handleSubmit}
                text={I18n.t('ui.button.login')}/>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://api.minibardelivery.com/users/password/new"
                className={style_sheet.forgotPasswordLink}>
                {I18n.t('ui.button.forgot_password')}
              </a>
            </MBForm>
          </div>
        </div>
      </div>
    );
  }
}

const LoginError = ({error_message}) => {
  if (_.isEmpty(error_message)) return null;
  return <div className={style_sheet.errorWrapper}><p>{error_message}</p></div>;
};

const LoginSTP = state => ({
  is_logged_in: session_selectors.userIsLoggedIn(state),
  is_loading: session_selectors.isLoggingIn(state),
  login_error: session_selectors.loginError(state)
});
const LoginDTP = {
  authenticate: session_actions.authenticate,
  clearLoginError: session_actions.clearLoginError
};
const LoginContainer = connect(LoginSTP, LoginDTP)(Login);
export default LoginContainer;
