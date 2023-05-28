//@flow

import React, {PureComponent} from 'react';
import _ from 'lodash';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
import I18n from '../../../localization';
import MBButton from '../../elements/MBButton';
import MBIcon from '../../elements/MBIcon';
import MBRadioOption from '../../elements/MBRadioOption';
import style_sheet from './OrderFiltersModal.module.css';

const TYPE_FILTER_OPTIONS = ['on_demand', 'shipped', 'pickup'];
const ATTRIBUTE_FILTER_OPTIONS = ['vip', 'gift', 'scheduled', 'exception'];

type OrderFiltersModalProps = { applyFilters: (Object) => void, are_applied_filters: boolean };
type OrderFiltersModalState = { focused_field: string };

class OrderFiltersModal extends PureComponent {
  props: OrderFiltersModalProps
  state: OrderFiltersModalState

  constructor(props) {
    super(props);
    this.state = {focused_field: ''};
  }

  handleApplyFilters = () => {
    this.props.toggleVisibility();
    this.props.applyFilters();
  }

  isBeforeStart = date => date.isBefore(this.props.filters.date_range.start)
  isAfterEnd = date => date.isAfter(this.props.filters.date_range.end)

  render() {
    const {filters, toggleFilter, setDateFilter, toggleVisibility, visible, are_applied_filters} = this.props;
    return (
      <div className={style_sheet.wrapper}>
        <MBButton button_type={are_applied_filters ? 'active' : 'secondary'} size="large" onClick={toggleVisibility}>
          <MBIcon icon="filter" color={are_applied_filters ? 'mb_white' : 'mb_black'}/>
          <p className={style_sheet.filterButtonText}>{I18n.t('ui.button.filter')}</p>
        </MBButton>
        {visible &&
        <div className={style_sheet.filterDropdown}>
          <p className={style_sheet.filterLabel}>{I18n.t('ui.header.date_range')}</p>
          <div className={style_sheet.dateRow}>
            <SingleDatePicker
              date={_.get(filters, 'date_range.start') ? moment(filters.date_range.start) : null}
              onDateChange={date => {
                this.setState({focused_field: ''});
                setDateFilter({start: date.startOf('day')});
              }}
              focused={this.state.focused_field === 'start'}
              onFocusChange={({focused}) => {
                this.setState({focused_field: focused ? 'start' : ''});
              }}
              numberOfMonths={1}
              placeholder={I18n.t('ui.placeholder.start')}
              anchorDirection="right"
              isDayBlocked={this.isAfterEnd}
              isOutsideRange={() => false}
              showDefaultInputIcon
              hideKeyboardShortcutsPanel/>
            <p>{I18n.t('ui.header.to')}</p>
            <SingleDatePicker
              date={_.get(filters, 'date_range.end') ? moment(filters.date_range.end) : null}
              onDateChange={date => {
                this.setState({focused_field: ''});
                setDateFilter({end: date.endOf('day')});
              }}
              focused={this.state.focused_field === 'end'}
              onFocusChange={({focused}) => {
                this.setState({focused_field: focused ? 'end' : ''});
              }}
              numberOfMonths={1}
              placeholder={I18n.t('ui.placeholder.end')}
              anchorDirection="right"
              isDayBlocked={this.isBeforeStart}
              isOutsideRange={() => false}
              showDefaultInputIcon
              hideKeyboardShortcutsPanel/>
          </div>
          <p className={style_sheet.filterLabel}>{I18n.t('ui.header.fulfillment_method')}</p>
          <div className={style_sheet.row}>
            {TYPE_FILTER_OPTIONS.map(type => (
              <MBRadioOption
                key={`${type}radio`}
                toggleOption={() => toggleFilter('delivery_method_types', type)}
                active={filters.delivery_method_types && filters.delivery_method_types.includes(type)}>
                {I18n.t(`ui.button.${type}`)}
              </MBRadioOption>
            ))}
          </div>
          <p className={style_sheet.filterLabel}>{I18n.t('ui.header.attribute')}</p>
          <div className={style_sheet.row}>
            {ATTRIBUTE_FILTER_OPTIONS.map(attribute => (
              <MBRadioOption
                key={`${attribute}radio`}
                toggleOption={() => toggleFilter('attributes', attribute)}
                active={filters.attributes && filters.attributes.includes(attribute)}>
                {I18n.t(`ui.button.${attribute}`)}
              </MBRadioOption>
            ))}
          </div>
          <div className={style_sheet.dateRow}>
            <MBButton expand onClick={this.handleApplyFilters}>
              {I18n.t('ui.button.apply_filters')}
            </MBButton>
          </div>
        </div>
        }
      </div>
    );
  }
}

export default OrderFiltersModal;
