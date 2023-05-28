// @flow

import React, {PureComponent} from 'react';
import _ from 'lodash';
import moment from 'moment';
import {connect} from 'react-redux';
import {serverTimeFormat} from '@minibar/store-business/src/__tests__/utils/date';
import * as Ent from '@minibar/store-business/src/utils/ent';
import type {Order, OrderListName, OrderFilters} from '../../../business/order';
import {order_actions, order_selectors, order_helpers} from '../../../business/order';
import I18n from '../../../localization';
import MBTable from '../../elements/MBTable';
import SearchInput from '../../shared/SearchInput';
import OrderFiltersModal from '../../shared/OrderFiltersModal';
import OrderTable from '../../shared/OrderTable';
import AppliedFilters from './AppliedFilters';
import RefreshList from './RefreshList';
import style_sheet from './OrderList.module.css';

const {orderList, isFetching} = order_selectors;
const {
  listIds,
  listTotalPages,
  listTotalCount,
  listNextPage,
  listFilters,
  listQuery,
  isListStale,
  appliedFiltersArray,
  filtersEmpty
} = order_helpers;

const blank_state = {
  query: '',
  filters: {
    date_range: {start: null, end: null},
    delivery_method_types: [],
    attributes: []
  },
  is_filters_modal_visible: false
};

const formatDateRange = (date_range: { [start]: string, [end]: string }) => (
  _.mapValues(_.pickBy(date_range), date => serverTimeFormat(moment(date)))
);

type OrderListProps = {
  list_name: OrderListName,
  orders: Array<Order>,
  fetch: () => void,
  is_fetching: boolean,
  total_pages: number,
  total_count: number,
  next_page: number,
  applied_query: string,
  applied_filters: OrderFilters,
  is_stale: boolean
};
type OrderListState = {
  query: string,
  filters: OrderFilters,
  is_filters_modal_visible: boolean
};

export class OrderList extends PureComponent {
  props: OrderListProps
  state: OrderListState

  constructor(props: OrderListProps) {
    super(props);
    this.state = blank_state;
  }

  registerScrollListener = () => {
    window.onscroll = (_e) => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
        this.attemptNextPageFetch();
      }
    };
  }

  componentWillMount() {
    if (_.isEmpty(this.props.orders)) {
      const {query, filters} = blank_state;
      this.props.fetch({page: 1, query, filters});
    }
    this.syncFilters(this.props.applied_query, this.props.applied_filters);
    this.registerScrollListener();
  }

  componentWillReceiveProps(next_props: OrderListProps) {
    this.syncFilters(next_props.applied_query, next_props.applied_filters);
  }

  syncFilters = (applied_query: string, applied_filters: OrderFilters) => {
    this.setState({query: applied_query, filters: applied_filters});
  }

  attemptNextPageFetch = () => {
    const is_last = (this.props.next_page > this.props.total_pages) && !_.isEmpty(this.props.orders);
    if (!is_last && !this.props.is_fetching) {
      const {query, filters} = this.state;
      this.props.fetch({
        page: this.props.next_page,
        query,
        filters: {...filters, date_range: {...formatDateRange(filters.date_range)}}
      });
    }
  }

  submitQuery = () => {
    const {query, filters} = this.state;
    this.props.fetch({page: 1, query, filters: {...filters, date_range: {...formatDateRange(filters.date_range)}}});
  }

  removeFilter = (type, value) => {
    let next_state = this.state;
    if (type === 'query') next_state = {...next_state, query: ''};
    else if (type === 'start' || type === 'end') _.set(next_state, `filters.date_range.${type}`, null);
    else {
      next_state = {
        ...next_state,
        filters: {
          ...next_state.filters,
          delivery_method_types: _.without(next_state.filters.delivery_method_types, value),
          attributes: _.without(next_state.filters.attributes, value)
        }
      };
    }
    this.props.fetch({
      page: 1,
      query: next_state.query,
      filters: {...next_state.filters, date_range: {...formatDateRange(next_state.filters.date_range)}}
    });
    this.setState(next_state);
  }

  clearFilters = () => {
    const {query, filters} = blank_state;
    this.props.fetch({page: 1, query, filters});
    this.setState(blank_state);
  }

  refresh = () => {
    const {query, filters} = this.state;
    this.props.fetch({page: 1, query, filters});
  }

  toggleFiltersModalVisibility = () => this.setState({is_filters_modal_visible: !this.state.is_filters_modal_visible})
  setDateFilter = (date_filter) => {
    const {filters} = this.state;
    this.setState({filters: {...filters, date_range: {...filters.date_range, ...date_filter}}});
  }
  toggleFilter = (scope, value) => {
    const {filters} = this.state;
    this.setState({
      filters: {
        ...filters,
        [scope]: filters[scope].includes(value) ? _.without(filters[scope], value) : [...filters[scope], value]
      }
    });
  }
  handleQueryChange = (e) => {
    this.setState({query: e.target.value});
  }

  render() {
    const {
      orders,
      is_fetching,
      next_page,
      total_pages,
      total_count,
      list_name,
      applied_filters,
      applied_query,
      is_stale
    } = this.props;
    return (
      <div>
        <div key="search_wrapper" className={style_sheet.actionRow}>
          <SearchInput
            query={this.state.query}
            onChange={this.handleQueryChange}
            submit={this.submitQuery}
            placeholder={I18n.t('ui.placeholder.search_orders')}/>
          <OrderFiltersModal
            filters={this.state.filters}
            are_applied_filters={!filtersEmpty(applied_filters)}
            toggleFilter={this.toggleFilter}
            setDateFilter={this.setDateFilter}
            applyFilters={this.submitQuery}
            visible={this.state.is_filters_modal_visible}
            toggleVisibility={this.toggleFiltersModalVisibility}/>
        </div>
        <RefreshList visible={is_stale && !is_fetching} refresh={this.refresh}/>
        <AppliedFilters
          key="applied_filters"
          query={applied_query}
          filters={appliedFiltersArray(applied_filters)}
          is_fetching={is_fetching}
          total_count={total_count}
          removeFilter={this.removeFilter}
          clearFilters={this.clearFilters}/>
        <OrderTable orders={orders} updateable={list_name === 'active'}/>
        <MBTable.Footer
          is_fetching={is_fetching}
          is_empty={_.isEmpty(orders)}
          has_more={next_page <= total_pages}
          loadMore={this.attemptNextPageFetch}
          empty_message={I18n.t(`ui.table.empty.${list_name}`)}/>
      </div>
    );
  }
}

const OrderListSTP = () => {
  const findOrders = Ent.find('order');
  return (state, {location}) => {
    const list_name = location.pathname.match(/\/orders\/(.*)/)[1];
    const list = orderList(state, list_name);
    return {
      list_name,
      orders: findOrders(state, listIds(list)),
      is_fetching: isFetching(state),
      total_pages: listTotalPages(list),
      total_count: listTotalCount(list),
      next_page: listNextPage(list),
      applied_filters: listFilters(list),
      applied_query: listQuery(list),
      is_stale: isListStale(list)
    };
  };
};
const OrderListDTP = (dispatch, {location}) => {
  const list_name = location.pathname.match(/\/orders\/(.*)/)[1];
  return {
    fetch: options => dispatch(order_actions.makeFetchList(list_name)(options))
  };
};
const OrderListContainer = connect(OrderListSTP, OrderListDTP)(OrderList);

export default OrderListContainer;
