// @flow

import React, {PureComponent} from 'react';
import {Dropdown} from 'semantic-ui-react';
import {order_helpers} from '../../../business/order';
import style_sheet from './form_fields.module.css';

const {productName} = order_helpers;

type OrderItemFieldProps = { onChangeText: (string, Object) => void, options: Array<Object> };

class OrderItemField extends PureComponent {
  props: OrderItemFieldProps

  static defaultProps = {name: 'order_item'}
  input: ReactClass<*>

  onChange = (_e, {value}) => {
    this.props.onChangeText(value, true);
  }

  render() {
    const {order, ...dropdown_props} = this.props;
    return (
      <Dropdown
        selection
        className={style_sheet.textInput}
        options={order.order_items.map(oi => {
          const name = productName(oi);
          return {text: name, value: name};
        })}
        onChange={this.onChange}
        {...dropdown_props} />
    );
  }
}

export default OrderItemField;
