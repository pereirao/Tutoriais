import React from 'react';
import style_sheet from './OrderSubstitutesButton.module.css';
import {MBButton} from '../../elements/MBButton';

class OrderSubstitutesRow extends React.Component {
  state = {
    value: null,
    quantity_to_replace: null
  };

  onChange = (e, keyName) => {
    const value = e.nativeEvent.target.value;
    if (value > 0) {
      const newValue = {};
      newValue[keyName] = value;
      this.setState(newValue);
    }
  }

  onSubmit = () => {
    this.props.setSubstitute(this.getValue('value'), this.getValue('quantity_to_replace'));
  }

  getValue = (keyName) => {
    const {order_item} = this.props;
    const initialValue = order_item.quantity;
    return this.state[keyName] || initialValue;
  }

  render() {
    const {order_item, ...sub} = this.props;
    if (this.state.quantity_to_replace === null) {
      this.setState({quantity_to_replace: order_item.quantity});
    }
    return (
      <tr>
        <td>{sub.sku}</td>
        <td>{sub.name}</td>
        <td>{sub.category}</td>
        <td>{sub.volume}</td>
        <td>{sub.inventory}</td>
        <td>{sub.price}</td>
        <td>
          <input
            type="number"
            onChange={e => this.onChange(e, 'value')}
            value={this.getValue('value')}
            className={style_sheet.substituteQuantity}/>
        </td>
        <td>
          <input
            type="number"
            onChange={e => this.onChange(e, 'quantity_to_replace')}
            value={this.getValue('quantity_to_replace')}
            className={style_sheet.substituteQuantity}/>
        </td>
        <td>
          <MBButton button_type="link" onClick={this.onSubmit} className="success">
            Substitute
          </MBButton>
        </td>
      </tr>
    );
  }
}

export default OrderSubstitutesRow;
