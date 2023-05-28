// @flow

import React, {PureComponent} from 'react';
import NumberFormat from 'react-number-format';
import style_sheet from './form_fields.module.css';

type NumberFieldProps = {
  onChangeText: (string, Object) => void
};

class NumberField extends PureComponent {
  props: NumberFieldProps

  static defaultProps = {}
  input: ReactClass<*>

  value: number;

  onChangeText = value => {
    this.props.onChangeText(value, true);
  }

  render() {
    let format = this.props.format;
    if (!format && this.props.digits) {
      format = '#'.repeat(this.props.digits);
    }
    return (
      <div>
        <NumberFormat
          format={format}
          mask={this.props.mask || '_'}
          ref={el => {
            this.input = el;
          }}
          className={style_sheet.numberInput}
          {...this.props}
          onChange={({target}) => this.onChangeText(target.value)}/>
      </div>
    );
  }
}

export default NumberField;
