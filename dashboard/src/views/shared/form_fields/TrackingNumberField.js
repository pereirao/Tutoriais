// @flow

import React, {PureComponent} from 'react';
import style_sheet from './form_fields.module.css';

type TrackingNumberFieldProps = { onChangeText: (string, Object) => void };

class TrackingNumberField extends PureComponent {
  props: TrackingNumberFieldProps

  static defaultProps = {name: 'tracking_number'}
  input: ReactClass<*>

  onChangeText = value => {
    this.props.onChangeText(value, true);
  }

  render() {
    return (
      <input
        ref={el => {
          this.input = el;
        }}
        className={style_sheet.textInput}
        {...this.props}
        onChange={({target}) => this.onChangeText(target.value)}/>
    );
  }
}

export default TrackingNumberField;
