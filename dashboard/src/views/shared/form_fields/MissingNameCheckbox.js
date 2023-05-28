// @flow

import React, {PureComponent} from 'react';
import {Checkbox} from 'semantic-ui-react';
import style_sheet from './form_fields.module.css';

type MissingNameCheckboxProps = { onChangeText: (string, Object) => void };

class MissingNameCheckbox extends PureComponent {
  props: MissingNameCheckboxProps

  static defaultProps = {name: 'missing_name', labelEl: null}
  input: ReactClass<*>

  onChange = (_e, {checked}) => {
    this.props.onChangeText(checked, true);
  }

  render() {
    const {label} = this.props;
    return (
      <Checkbox className={style_sheet.checkbox} label={label} onChange={this.onChange}/>
    );
  }
}

export default MissingNameCheckbox;
