//@flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as Ent from '@minibar/store-business/src/utils/ent';
import VariantListRow from './VariantListRow';
import style_sheet from './Inventory.module.css';
import VariantFilters from '../../shared/VariantFilters';
import AppliedFilters from '../../shared/OrderList/AppliedFilters';
import SearchInput from '../../shared/SearchInput';
import MBTable from '../../elements/MBTable';
import MBIcon from '../../elements/MBIcon';
import MBTooltip from '../../elements/MBTooltip';
import type Variant from '../../../business/variant';
import {variant_actions, variant_selectors, variant_helpers} from '../../../business/variant';
import I18n from '../../../localization';

const {VARIANTS_COLUMN_ORDER} = variant_helpers;
const {
  listIds,
  totalPages,
  totalCount,
  nextPage,
  isFetching
} = variant_selectors;

const initial_state = {query: '', in_stock: null, is_case_eligible_tooltip_open: false};

type VariantListProps = {
  variants: Array<Variant>,
  applied_query: string,
  applied_filters: Object,
  total_pages: number,
  total_count: number,
  next_page: number,
  is_fetching: boolean
};
type VariantListState = {
  query: string,
  in_stock: boolean,
  is_case_eligible_tooltip_open: boolean
};

export class VariantList extends PureComponent {
  props: VariantListProps
  state: VariantListState

  constructor(props: VariantListProps) {
    super(props);
    this.state = initial_state;
  }

  componentWillMount() {
    const {query, in_stock} = this.state;
    this.fetchVariants({query, page: 1, in_stock});
    window.onscroll = (_e) => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
        this.nextPage();
      }
    };
  }

  handleQueryChange = (e) => {
    this.setState({query: e.target.value});
  };

  nextPage = () => {
    const is_last = (this.props.next_page > this.props.total_pages) && !_.isEmpty(this.props.variants);
    if (!is_last) {
      const {query, in_stock} = this.state;
      this.fetchVariants({query, page: this.props.next_page, in_stock});
    }
  };

  applyFilters = (filters) => {
    const {query} = this.state;
    this.fetchVariants({query, in_stock: filters.in_stock, page: 1});
    this.setState({in_stock: filters.in_stock});
  };

  removeFilter = (type, _value) => {
    let next_state = this.state;
    if (type === 'query') next_state = {...next_state, query: ''};
    else {
      next_state = {...next_state, in_stock: null};
    }
    this.fetchVariants({page: 1, query: next_state.query, in_stock: next_state.in_stock});
    this.setState(next_state);
  }

  toggleCaseEligibleTooltip = () => (
    this.setState({is_case_eligible_tooltip_open: !this.state.is_case_eligible_tooltip_open})
  )

  renderTableHeader = (columns) => (
    <MBTable.Header>
      {columns.map(column_name => {
        if (column_name === 'mobile_summary') {
          return null; // no header for mobile summary column
        } else if (column_name === 'case_eligible') {
          return (
            <MBTable.HeaderCell mobile_hidden key={`${column_name}header`}>
              {I18n.t(`ui.table.${column_name}`)}
              <MBIcon
                inline
                icon="info"
                size="small"
                onClick={this.toggleCaseEligibleTooltip}
                title={I18n.t('accessibility.title.case_eligible')}/>
              <MBTooltip visible={this.state.is_case_eligible_tooltip_open}>
                {I18n.t('ui.tooltip.case_eligible')}
              </MBTooltip>
            </MBTable.HeaderCell>
          );
        } else {
          return (
            <MBTable.HeaderCell mobile_hidden key={`${column_name}header`}>
              {I18n.t(`ui.table.${column_name}`)}
            </MBTable.HeaderCell>
          );
        }
      })}
    </MBTable.Header>
  );

  clearFilters = () => {
    const {query, in_stock} = initial_state;
    this.fetchVariants({page: 1, query, in_stock});
    this.setState(initial_state);
  }

  submitQuery = () => {
    const {query, in_stock} = this.state;
    this.fetchVariants({query, page: 1, in_stock});
  };

  fetchVariants = ({query, page, in_stock}) => {
    const {location} = this.props;
    const is_active = location.pathname.endsWith('active');
    this.props.fetchVariants({query, page, in_stock, is_active});
  }

  render() {
    const {
      variants,
      applied_query,
      applied_filters,
      total_count,
      is_fetching,
      next_page,
      total_pages
    } = this.props;
    return (
      <div>
        <div className={style_sheet.tableWrapper}>
          <div className={style_sheet.searchWrapper}>
            <SearchInput query={this.state.query} onChange={this.handleQueryChange} submit={this.submitQuery}
                         placeholder={I18n.t('ui.placeholder.search_variants')}/>
            <VariantFilters applyFilters={this.applyFilters}/>
          </div>
          <AppliedFilters
            query={applied_query}
            filters={_.isEmpty(applied_filters) ? [] : [{
              type: 'filter',
              value: `in_stock.${applied_filters.in_stock}`
            }]}
            is_fetching={is_fetching}
            total_count={total_count}
            removeFilter={this.removeFilter}
            clearFilters={this.clearFilters}/>
          <MBTable.Table>
            {this.renderTableHeader(VARIANTS_COLUMN_ORDER)}
            <MBTable.Body>
              {variants.map(variant => <VariantListRow key={variant.sku} variant={variant}/>)}
            </MBTable.Body>
          </MBTable.Table>
          <MBTable.Footer
            is_fetching={is_fetching}
            is_empty={_.isEmpty(variants)}
            has_more={next_page <= total_pages}
            loadMore={this.nextPage}
            empty_message={I18n.t('ui.table.empty.variants')}/>
        </div>
      </div>
    );
  }
}

const VariantListSTP = () => {
  const find_variants = Ent.find('variant');
  return state => ({
    variants: find_variants(state, listIds(state)),
    total_pages: totalPages(state),
    total_count: totalCount(state),
    next_page: nextPage(state),
    applied_query: variant_selectors.query(state),
    applied_filters: variant_selectors.filters(state),
    is_fetching: isFetching(state)
  });
};
const VariantListDTP = {
  fetchVariants: variant_actions.fetchVariants
};
const VariantListContainer = connect(VariantListSTP, VariantListDTP)(VariantList);

export default VariantListContainer;
