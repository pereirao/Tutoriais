// @flow

import React, {PureComponent} from 'react';
import {Dropdown} from 'semantic-ui-react';
import I18n from '../../../localization';
import style_sheet from './form_fields.module.css';

const PERIOD_OPTIONS = ['30min', '1hr', '2hrs'];

type BreakPeriodFieldProps = { onChange: (string) => void, options: Array<Object> };

class BreakPeriodField extends PureComponent {
  props: BreakPeriodFieldProps

  static defaultProps = {name: 'create_break_period'}
  input: ReactClass<*>

  onChange = (_e, {value}) => {
    this.props.onChange(value);
  }

  render() {
    return (
      <Dropdown
        selection
        options={PERIOD_OPTIONS.map(value => ({
          value,
          text: I18n.t(`form.option.${value}`)
        }))}
        onChange={this.onChange}
        className={style_sheet.breakPeriodField}
        placeholder={I18n.t('form.placeholder.select_one')}/>
    );
  }
}

export default BreakPeriodField;
