// @flow

import React, {PureComponent} from 'react';
import {Checkbox} from 'semantic-ui-react';
import I18n from '../../../localization';
import style_sheet from './form_fields.module.css';

type UseDspCheckboxProps = { onChangeText: (string, boolean) => void, label: string, name: string };

const UseDsp = (is_checked) => (is_checked ? 'true' : 'false');

class UseDspCheckbox extends PureComponent {
  props: UseDspCheckboxProps;

  static defaultProps = {name: 'use_delivery_service', label: I18n.t('ui.modal.on_demand.confirmed.label.use_dsp')};

  onChange = (e, {checked}) => {
    this.props.onChangeText(UseDsp(checked), true);
  };

  render() {
    return this.props.show ? <Checkbox name={this.props.name} className={style_sheet.checkbox} label={this.props.label}
                                       onChange={this.onChange}/> : null;
  }
}

export default UseDspCheckbox;
