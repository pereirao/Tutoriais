// @flow

import React, {PureComponent} from 'react';
import _ from 'lodash';
import I18n from '../../../localization';
import style_sheet from './form_fields.module.css';

const password_error_text = {
  required: I18n.t('form.error.required_field')
};
const password_validators = {
  required: val => !!val
};

type PasswordFieldProps = { onChangeText: (string, Object) => void, is_required: boolean };

class PasswordField extends PureComponent {
  props: PasswordFieldProps

  static defaultProps = {name: 'password', is_required: true}
  input: ReactClass<*>

  getValidity = value => (
    this.props.is_required ? _.mapValues(password_validators, validate => validate(value)) : true
  )

  onChangeText = value => {
    this.props.onChangeText(value, this.getValidity(value));
  }

  render() {
    return (
      <input
        type="password"
        errorText={password_error_text}
        placeholder={I18n.t(`form.placeholder.${this.props.name}`)}
        ref={el => {
          this.input = el;
        }}
        className={style_sheet.textInput}
        {...this.props}
        onChange={({target}) => this.onChangeText(target.value)}/>
    );
  }
}

export default PasswordField;
