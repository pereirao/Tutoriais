// @flow

import React, {PureComponent} from 'react';
import {Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import * as Ent from '@minibar/store-business/src/utils/ent';
import {order_helpers} from '../../../business/order';
import style_sheet from './form_fields.module.css';

const {deliveryEstimateOptions, makeDeliveryEstimateParam} = order_helpers;

type DeliveryEstimateFieldProps = { onChangeText: (string, Object) => void, options: Array<Object>, formFields: { [string]: MBFormField } };

class DeliveryEstimateField extends PureComponent {
  props: DeliveryEstimateFieldProps

  static defaultProps = {name: 'delivery_estimate'}
  input: ReactClass<*>

  render() {
    const disableDropdown = this.props.formFields.use_delivery_service.value === 'true';

    return (
      <DeliveryEstimateDropdown
        disabled={disableDropdown}
        order_id={this.props.order_id}
        onChangeText={this.props.onChangeText}
        className={style_sheet.textInput}/>
    );
  }
}

const DeliveryEstimateDropdownSTP = () => {
  const findOrder = Ent.find('order');
  return (state, {order_id}) => {
    const order = findOrder(state, order_id);
    return {
      order,
      options: deliveryEstimateOptions(order)
    };
  };
};
const connectDeliveryEstimateDropdown = connect(DeliveryEstimateDropdownSTP);
const DeliveryEstimateDropdown = connectDeliveryEstimateDropdown(({
                                                                    options,
                                                                    order,
                                                                    onChangeText,
                                                                    ...dropdown_props
                                                                  }) => {
  const handleChange = (_e, {value}) => {
    onChangeText(makeDeliveryEstimateParam(order, value), true);
  };
  return (
    <Dropdown selection options={options} onChange={handleChange} {...dropdown_props} />
  );
});
export default DeliveryEstimateField;
