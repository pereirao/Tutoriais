import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import I18n from 'i18n-js';
import {withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import {MBButton} from '../../elements/MBButton';
import SearchInput from '../../shared/SearchInput';
import style_sheet from './MergeProductModal.module.css';
import {
  SearchProductRoutine,
  selectProducts,
  selectProductsLoading,
  selectProductsReady,
  selectProductsIdle,
  selectProductMergingById,
  MergeProductRoutine,
  OpenProductMergeModal,
  CloseProductMergeModal,
  selectProductMergeModalIsOpen
} from '../../../business/product/product.dux';
import {
  orderById
} from '../../../business/order/selectors';
import {variant_helpers} from '../../../business/variant';
import MBLoader from '../../elements/MBLoader';
import MergeProductRow from './MergeProductRow';

const {variantTableRow} = variant_helpers;

class MergeProductModal extends Component {
  state = {
    open: false
  }

  openProductMergeModal = () => {
    this.search('');
    this.props.openProductMergeModal(this.props.variant.id);
  }

  closeProductMergeModal = () => {
    this.props.closeProductMergeModal(this.props.variant.id);
  }

  onSearch = (e) => {
    e.persist();
    this.debouncedSearch(e.target.value);
  }

  debouncedSearch = _.debounce((query) => this.search(query), 300);

  search = (query) => {
    const {id} = this.props.variant || {};
    return this.props.search({query, id});
  }

  mergeProduct = (product) => {
    const {variant} = this.props;
    this.props.mergeProduct({
      variant_id: variant.id,
      target: product.id
    });
    this.closeProductMergeModal();
  }

  renderRow = (product) => {
    const {variant} = this.props;
    return (
      <MergeProductRow
        {...product}
        key={product.id}
        variant={variant}
        mergeProduct={this.mergeProduct.bind(this, product)}/>
    );
  }

  render() {
    const {products, isProductMerging, isSearchLoading, isSearchReady, isSearchIdle} = this.props;
    const row_data = variantTableRow(this.props.variant);
    return (
      <Fragment>
        {isProductMerging ? <MBLoader/> :
          <MBButton onClick={this.openProductMergeModal} button_type={'tertiary'}>Match product</MBButton>}
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.closeProductMergeModal}
          contentLabel="Example Modal">
          <span
            onClick={this.closeProductMergeModal}
            role="button"
            tabIndex="0"
            className={style_sheet.closeWrapper}>
            <CloseIcon/>
          </span>
          <div>Product info: <strong>{row_data.product_name} - {row_data.product_details}</strong></div>
          <div className={style_sheet.divider}/>
          <div className={style_sheet.sectionContents}>
            <SearchInput
              onChange={this.onSearch}
              submit={() => {
              }}/>
          </div>
          <table className={style_sheet.table}>
            <thead>
            <tr className={style_sheet.tableHeader}>
              <td>{I18n.t('ui.table.product_name')}</td>
              <td>{I18n.t('ui.table.category')}</td>
              <td>{I18n.t('ui.table.volume')}</td>
              <td>{I18n.t('ui.table.status')}</td>
              <td/>
            </tr>
            {_.map(products, this.renderRow)}
            </thead>
          </table>
          <div style={{
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            {isSearchLoading ? <MBLoader/> : null}
            {isSearchIdle ? I18n.t('ui.table.substitutions.search_idle') : null}
            {isSearchReady && !products.length ? I18n.t('ui.table.substitutions.search_empty') : null}
            <div className={style_sheet.closeButton}>
              <MBButton onClick={this.closeProductMergeModal}>Close</MBButton>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

const MergeProductModalSTP = (state, props) => {
  return ({
    results: [],
    order: orderById(state)(props.match.params.number),
    products: selectProducts(state),
    isProductMerging: selectProductMergingById(state)(props.variant.id),
    isSearchLoading: selectProductsLoading(state),
    isSearchReady: selectProductsReady(state),
    isSearchIdle: selectProductsIdle(state),
    isOpen: selectProductMergeModalIsOpen(state)(props.variant.id)
  });
};

const MergeProductModalDTP = {
  search: SearchProductRoutine.trigger,
  openProductMergeModal: OpenProductMergeModal,
  closeProductMergeModal: CloseProductMergeModal,
  mergeProduct: MergeProductRoutine.trigger
};

const CloseIcon = () => (
  <svg className={style_sheet.closeIcon} height="16px" width="16px" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <line x1="1" y1="11" x2="11" y2="1" stroke="#781214" strokeWidth="2"/>
    <line x1="1" y1="1" x2="11" y2="11" stroke="#781214" strokeWidth="2"/>
  </svg>
);

export default withRouter(connect(MergeProductModalSTP, MergeProductModalDTP)(MergeProductModal));
