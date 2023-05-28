import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import I18n from 'i18n-js';
import {withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import {MBButton} from '../../elements/MBButton';
import SearchInput from '../../shared/SearchInput';
import style_sheet from './OrderSubstitutesButton.module.css';
import {
  SearchSubstituteRoutine,
  selectSubstitutes,
  selectSubstitutesLoading,
  selectSubstitutesReady,
  selectSubstitutesIdle,
  selectSubstitutingBySku,
  SetSubstituteRoutine,
  OpenSubstituteModal,
  CloseSubstituteModal,
  selectSubstituteModalIsOpen
} from '../../../business/substitute/substitute.dux';
import {
  orderById,
  pendingSubstitutionsByOrderItemId
} from '../../../business/order/selectors';
import MBLoader from '../../elements/MBLoader';
import OrderSubstitutesRow from './OrderSubstitutesRow';
import {order_helpers} from '../../../business/order';

const {orderAllowSubstitution} = order_helpers;

class OrderSubstitutesModal extends Component {
  state = {
    open: false
  }

  openSubstituteModal = () => {
    this.search('');
    this.props.openSubstituteModal(this.props.order_item.id);
  }

  closeSubstituteModal = () => {
    this.props.closeSubstituteModal(this.props.order_item.id);
  }

  onSearch = (e) => {
    e.persist();
    this.debouncedSearch(e.target.value);
  }

  debouncedSearch = _.debounce((query) => this.search(query), 300);

  search = (query) => {
    const {order} = this.props;
    const {sku} = this.props.order_item || {};
    const {id: shipmentId} = order || {};
    return this.props.search({query, sku, shipmentId, lower_price: orderAllowSubstitution(order)});
  }

  setSubstitute = (sub, value, quantity_to_rep) => {
    const quantity = parseInt(value);
    const quantity_to_replace = parseInt(quantity_to_rep);
    if (isNaN(quantity) || !(quantity > 0)) {
      return;
    }
    const {order, order_item} = this.props;
    this.props.setSubstitute({
      shipmentId: order.id,
      orderItemId: order_item.id,
      original: order_item.sku,
      sku: sub.sku,
      quantity,
      quantity_to_replace
    });
    this.closeSubstituteModal();
  }

  renderSubstitutePreview = (sp) => {
    return sp ? (
      <Fragment>
        <div>{`${sp.name} - ${sp.item_size} - ${sp.sku} - ${sp.unit_price} - ${sp.quantity}`}</div>
        <br/>
        <b>Waiting for Minibar to confirm with client</b>
      </Fragment>
    ) : (
      <MBButton onClick={this.openSubstituteModal} button_type={'tertiary'}>Substitute</MBButton>
    );
  }

  renderRow = (sub) => {
    const {order_item} = this.props;
    return (
      <OrderSubstitutesRow
        {...sub}
        key={sub.sku}
        order_item={order_item}
        setSubstitute={this.setSubstitute.bind(this, sub)}/>
    );
  }

  render() {
    const {substitutes, isSubstituting, isSearchLoading, isSearchReady, isSearchIdle, substitutePreview} = this.props;
    const sp = (substitutePreview[0] || {}).substitute;
    const {item_size, name, quantity, sku, unit_price} = this.props.order_item || {};
    return (
      <Fragment>
        {isSubstituting ? <MBLoader/> : this.renderSubstitutePreview(sp)}
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.closeSubstituteModal}
          contentLabel="Example Modal">
          <span
            onClick={this.closeSubstituteModal}
            role="button"
            tabIndex="0"
            className={style_sheet.closeWrapper}>
            <CloseIcon/>
          </span>
          <div>Substitute <strong>{name} - {item_size} - {unit_price} - {sku} - {quantity}</strong></div>
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
              <td>{I18n.t('ui.table.sku')}</td>
              <td>{I18n.t('ui.table.product_name')}</td>
              <td>{I18n.t('ui.table.type')}</td>
              <td>{I18n.t('ui.table.volume')}</td>
              <td>{I18n.t('ui.table.inventory')}</td>
              <td>{I18n.t('ui.table.price')}</td>
              <td>{I18n.t('ui.table.quantity')}</td>
              <td>{I18n.t('ui.table.quantity_to_replace')}</td>
              <td/>
            </tr>
            {_.map(substitutes, this.renderRow)}
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
            {isSearchReady && !substitutes.length ? I18n.t('ui.table.substitutions.search_empty') : null}
            <div className={style_sheet.closeButton}>
              <MBButton onClick={this.closeSubstituteModal}>Close</MBButton>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

const OrderSubstitutesModalSTP = (state, props) => {
  return ({
    results: [],
    order: orderById(state)(props.match.params.number),
    substitutes: selectSubstitutes(state),
    isSubstituting: selectSubstitutingBySku(state)(props.order_item.sku),
    isSearchLoading: selectSubstitutesLoading(state),
    isSearchReady: selectSubstitutesReady(state),
    isSearchIdle: selectSubstitutesIdle(state),
    isOpen: selectSubstituteModalIsOpen(state)(props.order_item.id),
    substitutePreview: pendingSubstitutionsByOrderItemId(props.match.params.number, props.order_item.id)(state)
  });
};

const OrderSubstitutesModalDTP = {
  search: SearchSubstituteRoutine.trigger,
  openSubstituteModal: OpenSubstituteModal,
  closeSubstituteModal: CloseSubstituteModal,
  setSubstitute: SetSubstituteRoutine.trigger
};

const CloseIcon = () => (
  <svg className={style_sheet.closeIcon} height="16px" width="16px" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <line x1="1" y1="11" x2="11" y2="1" stroke="#781214" strokeWidth="2"/>
    <line x1="1" y1="1" x2="11" y2="11" stroke="#781214" strokeWidth="2"/>
  </svg>
);

export default withRouter(connect(OrderSubstitutesModalSTP, OrderSubstitutesModalDTP)(OrderSubstitutesModal));
