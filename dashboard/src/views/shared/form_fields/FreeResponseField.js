// @flow

import React, {PureComponent} from 'react';
import I18n from '../../../localization';
import style_sheet from './form_fields.module.css';

type FreeResponseFieldProps = { onChangeText: (string, Object) => void, is_required: boolean };

class FreeResponseField extends PureComponent<FreeResponseFieldProps> {
  props: FreeResponseFieldProps

  static defaultProps = {name: 'notes', is_required: true}
  input: ReactClass<*>

  getValidity = value => (
    this.props.is_required ? !!value : true
  )

  onChangeText = value => {
    this.props.onChangeText(value, this.getValidity(value));
  }

  handleChange = ({target}) => {
    this.onChangeText(target.value);
  }

  render() {
    return (
      <textarea
        placeholder={I18n.t(`form.placeholder.${this.props.name}`)}
        ref={el => {
          this.input = el;
        }}
        className={style_sheet.textArea}
        {...this.props}
        onChange={this.handleChange}/>
    );
  }
}

export default FreeResponseField;
