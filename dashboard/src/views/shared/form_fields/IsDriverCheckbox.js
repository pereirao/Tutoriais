// @flow

import React, {PureComponent} from 'react';
import {Checkbox} from 'semantic-ui-react';
import I18n from '../../../localization';
import style_sheet from './form_fields.module.css';

type IsDriverCheckboxProps = { onChangeText: (string, boolean) => void, label: string, name: string };

class IsDriverCheckbox extends PureComponent {
  props: IsDriverCheckboxProps

  static defaultProps = {name: 'role', label: I18n.t('form.label.is_driver')}

  onChange = (e, {checked}) => {
    const isDriver = (is_checked) => (is_checked ? 'driver' : '');
    this.props.onChangeText(isDriver(checked), true);
  }

  render() {
    return (
      <Checkbox
        className={style_sheet.checkbox}
        label={this.props.label}
        onChange={this.onChange}/>
    );
  }
}

export default IsDriverCheckbox;
