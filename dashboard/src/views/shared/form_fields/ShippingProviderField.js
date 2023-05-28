// @flow

import React, {PureComponent} from 'react';
import {Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import I18n from '../../../localization';
import {session_selectors, session_helpers} from '../../../business/session';
import style_sheet from './form_fields.module.css';

const {currentSupplier} = session_selectors;
const {shippingProviderOptions} = session_helpers;

type ShippingProviderFieldProps = { onChangeText: (string, Object) => void, options: Array<Object> };

class ShippingProviderField extends PureComponent {
  props: ShippingProviderFieldProps

  static defaultProps = {name: 'shipping_provider'}
  input: ReactClass<*>

  onChange = (_e, {value}) => {
    this.props.onChangeText(value, true);
  }

  render() {
    return (
      <ShippingProviderDropdown
        placeholder={I18n.t('form.placeholder.provider')}
        className={style_sheet.textInput}
        onChange={this.onChange}/>
    );
  }
}

const ShippingProviderDropdownSTP = state => {
  const other_option = {text: I18n.t('form.option.other'), value: I18n.t('form.option.other')};
  return {options: [...shippingProviderOptions(currentSupplier(state)), other_option]};
};
const connectShippingProviderDropdown = connect(ShippingProviderDropdownSTP);
const ShippingProviderDropdown = connectShippingProviderDropdown(({options, onChange, ...dropdown_props}) => (
  <Dropdown selection options={options} onChange={onChange} {...dropdown_props} />
));

export default ShippingProviderField;
