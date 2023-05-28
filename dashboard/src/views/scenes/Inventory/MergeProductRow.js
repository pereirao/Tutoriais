import React from 'react';
import { MBButton } from '../../elements/MBButton';

class MergeProductRow extends React.Component {
  state = {};

  onSubmit = () => {
    this.props.mergeProduct(this.props.id, this.props.variant.id);
  }

  render(){
    const { ...product } = this.props;
    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>{product.item_volume}</td>
        <td>{product.state}</td>
        <td>
          <MBButton button_type="tertiary" onClick={this.onSubmit} className="success">
            Select
          </MBButton>
        </td>
      </tr>
    );
  }
}

export default MergeProductRow;
