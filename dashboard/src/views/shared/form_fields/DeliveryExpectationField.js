// @flow

import React, { PureComponent } from 'react';
import { Dropdown } from 'semantic-ui-react';
import I18n from '../../../localization';
import style_sheet from './form_fields.module.css';

// const PERIOD_OPTIONS = ['30min', '1hr', '2hrs', '3hrs', '4hrs', '5hrs', '6hrs'];
const DELIVERY_EXPECTATION_OPTIONS = ['-1hr', '60_to_120mins', '60_to_90mins', '90_to_120mins', '120_to_150mins', '150_to_180mins'];

type DeliveryExpectationFieldProps = {onChange: (string) => void, options: Array<Object>};
class DeliveryExpectationField extends PureComponent {
  props: DeliveryExpectationFieldProps

  static defaultProps = {name: 'delivery_expectation_period'}
  input: ReactClass<*>

  onChange = (_e, {value}) => {
    this.props.onChange(value);
  }

  render(){
    return (
      <Dropdown
        selection
        fluid
        options={DELIVERY_EXPECTATION_OPTIONS.map(value => ({
          value,
          text: I18n.t(`form.option.${value}`)
        }))}
        onChange={this.onChange}
        className={style_sheet.breakPeriodField}
        placeholder={I18n.t('form.placeholder.select_one')} />
    );
  }
}

export default DeliveryExpectationField;
