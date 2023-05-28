// @flow

import React, {PureComponent} from 'react';
import {Dropdown} from 'semantic-ui-react';
import I18n from '../../../localization';
import style_sheet from './form_fields.module.css';

const PERMANENCE_OPTIONS = ['temporary', 'permanent'];

type PermanenceFieldProps = { onChangeText: (string, Object) => void, options: Array<Object> };

class PermanenceField extends PureComponent {
  props: PermanenceFieldProps

  static defaultProps = {name: 'change_hours_permanence'}
  input: ReactClass<*>

  onChange = (_e, {value}) => {
    this.props.onChangeText(value, true);
  }

  render() {
    return (
      <Dropdown
        selection
        options={PERMANENCE_OPTIONS.map(value => ({
          value,
          text: I18n.t(`form.option.${value}`)
        }))}
        onChange={this.onChange}
        className={style_sheet.permanenceField}
        placeholder={I18n.t('form.placeholder.select_one')}/>
    );
  }
}

export default PermanenceField;
