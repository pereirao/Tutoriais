//@flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import style_sheet from './Inventory.module.css';
import MBTable from '../../elements/MBTable';
import MBButton from '../../elements/MBButton';
import MBIcon from '../../elements/MBIcon';
import {variant_actions, variant_helpers} from '../../../business/variant';
import I18n from '../../../localization';


const {variantTableRow, VARIANTS_COLUMN_ORDER} = variant_helpers;
const cx = classNames.bind(style_sheet);

class EditVariantForm extends PureComponent {
  constructor(props: Object) {
    super(props);
    const {variant} = this.props;
    this.state = {
      id: variant.id,
      sku: variant.sku,
      product_name: variant.name,
      case_eligible: variant.case_eligible,
      inventory: variant.inventory,
      price: variant.price,
      sale_price: variant.sale_price
    };
  }

  onChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  }

  submitVariant = () => {
    this.props.toggleEditMode();
    this.props.updateVariant({
      variant_id: this.state.id,
      sku: this.state.sku,
      case_eligible: this.state.case_eligible,
      inventory: this.state.inventory,
      price: this.state.price,
      sale_price: this.state.sale_price
    });
  };

  zeroInventory = () => {
    this.setState({
      inventory: 0
    });
  }

  inputComponent = (key, value, variant) => (<input
    onChange={(e) => this.onChange(e, key)}
    className={cx('input', `${key}_input`)}
    id={`${variant.id}${key}`}
    value={value}
    type="text"/>);

  selectComponent = (key, value, variant) => (
    <select onChange={(e) => this.onChange(e, key)} className={`${key}_input`} id={`${variant.id}${key}`} value={value}>
      <option value>{I18n.t('form.option.yes')}</option>
      <option value={false}>{I18n.t('form.option.no')}</option>
    </select>
  )

  formatCellDatum = (key, value, variant) => {
    switch (key) {
      case 'product_name':
        return (
          <span>
            <span>
              {value}
            </span>
            <br/>
            <span className={style_sheet.productDetails}>
              {`${variant.category} | ${variant.volume}`}
            </span>
          </span>
        );
      case 'inventory':
      case 'price':
      case 'sale_price':
        return this.inputComponent(key, value, variant);
      case 'case_eligible':
        return this.selectComponent(key, value, variant);
      case 'edit': {
        return (
          <div className={style_sheet.editOptionsWrapper}>
            <MBButton button_type="link" onClick={() => {
              this.submitVariant();
            }}>{I18n.t('ui.table.submit')}</MBButton>
            <MBIcon icon="cancel" color="mb_red" onClick={() => {
              this.props.toggleEditMode();
            }}/>
          </div>
        );
      }
      case 'mobile_summary': {
        const row_data = variantTableRow(variant);
        return (
          <span className={style_sheet.mobileEditWrapper}>
            <div>
              <span>
                {I18n.t(`ui.table.variant_mobile_main_on_sale.${row_data.sale_price !== 'Not discounted'}`, {
                  name: row_data.product_name,
                  sale_price: row_data.sale_price,
                  price: row_data.price
                })}
              </span>
              <br/>
              <span className={style_sheet.productDetails}>
                {I18n.t('ui.table.variant_mobile_secondary', {
                  details: row_data.product_details,
                  inventory: row_data.inventory
                })}
              </span>
            </div>
            <div className={style_sheet.editQuantityWrapper}>
              <table className={style_sheet.variantEditTable}>
                <tbody>
                  <tr>
                    <td>Inventory:</td>
                    <td>
                      {this.inputComponent('inventory', this.state.inventory, variant)}
                      <MBButton
                        expand
                        onClick={(_e) => this.zeroInventory(variant.id)}
                        className={style_sheet.mobileInventoryZeroButton}>
                        {I18n.t('ui.button.zero')}
                      </MBButton>
                    </td>
                  </tr>
                  <tr>
                    <td>Price:</td>
                    <td>{this.inputComponent('price', this.state.price, variant)}</td>
                  </tr>
                  <tr>
                    <td>Sale Price:</td>
                    <td>{this.inputComponent('sale_price', this.state.sale_price, variant)}</td>
                  </tr>
                  <tr>
                    <td>Case Eligible:</td>
                    <td>{this.selectComponent('case_eligible', this.state.case_eligible, variant)}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className={style_sheet.mobileEditButtonWrapper}>
                        <div className={style_sheet.editOptionsWrapper}>
                          <MBButton button_type="link" onClick={() => {
                            this.submitVariant();
                          }}>{I18n.t('ui.table.submit')}</MBButton>
                          <MBIcon
                            icon="cancel"
                            color="mb_red"
                            onClick={() => {
                              this.props.toggleEditMode();
                            }}/>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </span>
        );
      }
      default:
        return <p>{value}</p>;
    }
  };

  render() {
    const {variant} = this.props;
    return (
      <MBTable.Row key={`${variant.id}row`}>
        {VARIANTS_COLUMN_ORDER.map(col => {
          return (
            <MBTable.Cell
              key={`${variant.id}${col}`}
              mobile_only={col === 'mobile_summary'}
              mobile_hidden={col !== 'mobile_summary'}>
              {this.formatCellDatum(col, this.state[col], variant)}
            </MBTable.Cell>
          );
        })}
      </MBTable.Row>
    );
  }
}

const EditVariantFormDTP = {
  updateVariant: variant_actions.updateVariant
};
const EditVariantFormContainer = connect(null, EditVariantFormDTP)(EditVariantForm);

export default EditVariantFormContainer;
