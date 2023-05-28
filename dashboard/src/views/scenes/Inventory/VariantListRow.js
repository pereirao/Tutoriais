// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditVariantForm from './EditVariantForm';
import style_sheet from './Inventory.module.css';
import MBTable from '../../elements/MBTable';
import MBButton from '../../elements/MBButton';
import MBIcon from '../../elements/MBIcon';
import I18n from '../../../localization';
import type {Variant} from '../../../business/variant';
import {variant_helpers, variant_actions, variant_selectors} from '../../../business/variant';
import MergeProductModal from './MergeProductModal';

const {variantTableRow, VARIANTS_COLUMN_ORDER} = variant_helpers;

type VariantListRowProps = { variant: Variant, updating: boolean };
type VariantListRowState = { edit_mode: boolean };

export class VariantListRow extends Component {
  props: VariantListRowProps
  state: VariantListRowState

  constructor(props: VariantListRowProps) {
    super(props);
    this.state = {edit_mode: false};
  }

  toggleEditMode = () => {
    this.setState({edit_mode: !this.state.edit_mode});
  };

  clickAddButton = () => {
    const {updateVariant, variant} = this.props;
    updateVariant({variant_id: variant.id, sku: variant.sku, not_owned: false});
  }

  clickRemoveButton = () => {
    const {updateVariant, variant} = this.props;
    updateVariant({variant_id: variant.id, sku: variant.sku, active: false});
  }

  clickRestoreButton = () => {
    const {updateVariant, variant} = this.props;
    updateVariant({variant_id: variant.id, sku: variant.sku, active: true});
  }

  onChange = (e: Object, field: string) => {
    this.setState({[field]: e.target.value});
  };

  activateButton = (isMobile) => {
    if (this.props.variant.not_owned) {
      return (
        <MBButton onClick={this.clickAddButton} style={{backgroundColor: '#F6FAF3', color: '#84B168', border: 'none'}}>
          <div className={style_sheet.editIcon}>
            <MBIcon icon="add" color="mb_green" size="small"/>
          </div>
          {isMobile ? 'Add' : 'Add to Inventory'}
        </MBButton>
      );
    } else if (this.props.variant.active) {
      return (
        <MBButton onClick={this.clickRemoveButton}
                  style={{backgroundColor: '#FAF6F4', color: '#AE7B7B', border: 'none'}}>
          <div className={style_sheet.editIcon}>
            <MBIcon icon="delete" color="mb_red" size="small"/>
          </div>
          {isMobile ? 'Remove' : 'Remove from Inventory'}
        </MBButton>
      );
    } else if (this.props.variant.product_state === 'pending' || this.props.variant.product_state === 'inactive') {
      return (
        <MergeProductModal variant={this.props.variant}/>
      );
    } else {
      return (
        <MBButton onClick={this.clickRestoreButton} button_type="link">
          <div className={style_sheet.editIcon}>
            <MBIcon icon="cancel" color="mb_red" size="small"/>
          </div>
          Restore
        </MBButton>
      );
    }
  }

  renderCells(col: Object) {
    const row_data = variantTableRow(this.props.variant);
    if (this.props.updating === this.props.variant.sku) return 'loading...'; // TODO: Use Loader
    switch (col) {
      case 'product_name': {
        return (
          <span>
            <span>
              {row_data.product_name}
            </span>
            <br/>
            <span className={style_sheet.productDetails}>
              {row_data.product_details}
            </span>
          </span>
        );
      }
      case 'edit': {
        return (this.renderButton());
      }
      case 'mobile_summary': {
        return (
          <span className={style_sheet.mobileSummaryWrapper}>
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
            <div className={style_sheet.mobileEditButtonWrapper}>
              <span>
                {this.renderButton(true)}
              </span>
              <span>
                {this.activateButton(true)}
              </span>
            </div>
          </span>
        );
      }
      case 'active': {
        return this.activateButton();
      }
      default:
        return (row_data[col]);
    }
  }

  renderButton(isMobile) {
    if (this.props.updating === this.props.variant.sku) {
      return (<td>Loading...</td>); // TODO: Use Loader
    } else {
      return (
        <span className={style_sheet.editButtonWrapper}>
          <MBButton button_type="link" onClick={this.toggleEditMode}>
            <div className={style_sheet.editIcon}>
              <MBIcon icon="edit" color="mb_red" size="small"/>
            </div>
            {isMobile ? I18n.t('ui.button.mobile_edit_product') : I18n.t('ui.button.edit_product')}
          </MBButton>
        </span>
      );
    }
  }

  render() {
    if (this.state.edit_mode) {
      return (
        <EditVariantForm toggleEditMode={this.toggleEditMode} variant={this.props.variant}/>
      );
    } else {
      return (
        <MBTable.Row key={`${this.props.variant.sku}row`}>
          {VARIANTS_COLUMN_ORDER.map(col => {
            return (
              <MBTable.Cell
                key={`${this.props.variant.sku}${col}`}
                mobile_only={col === 'mobile_summary'}
                mobile_hidden={col !== 'mobile_summary'}>
                {this.renderCells(col)}
              </MBTable.Cell>
            );
          })}
        </MBTable.Row>
      );
    }
  }
}

const VariantListRowSTP = (state) => ({
  updating: variant_selectors.isUpdating(state)
});
const VariantListRowDTP = {
  updateVariant: variant_actions.updateVariant
};

const VariantListRowContainer = connect(VariantListRowSTP, VariantListRowDTP)(VariantListRow);

export default VariantListRowContainer;
