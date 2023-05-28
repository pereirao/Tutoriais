// @flow

import React from 'react';
import _ from 'lodash';
import I18n from '../../../localization';
import MBButton from '../../elements/MBButton';
import MBLoader from '../../elements/MBLoader';
import {date_helpers} from '../../utils/helpers';
import style_sheet from './OrderList.module.css';

const {formatDateShort} = date_helpers;

// TODO: fix pills present logic and differ if from clear filters

type AppliedFiltersProps = {
  query: string,
  filters: Array<Object>,
  removeFilter: Object => void,
  clearFilters: () => void,
  total_count: number,
  is_fetching: boolean
};
const AppliedFilters = ({
                          query,
                          filters,
                          removeFilter,
                          clearFilters,
                          total_count,
                          is_fetching
                        }: AppliedFiltersProps) => {
  const pill_count = filters.length + (_.isEmpty(query) ? 0 : 1);
  return (
    <div className={style_sheet.appliedFiltersWrapper}>
      <ResultsCount key="results_count" visible={pill_count > 0} total_count={total_count}/>
      <AppliedFilterPill
        key="query_pill"
        value={query}
        type="query"
        removeFilter={removeFilter}
        is_fetching={is_fetching}/>
      {filters.map(filter => (
        <AppliedFilterPill
          key={`${filter.type}_${filter.value}_pill`}
          removeFilter={removeFilter}
          is_fetching={is_fetching}
          {...filter} />
      ))}
      <ClearFilters key="clear_filters" clearFilters={clearFilters} visible={pill_count > 1}/>
    </div>
  );
};

type AppliedFilterPillProps = {
  type: string,
  value: string,
  removeFilter: Object => void,
  is_fetching: boolean
};
const AppliedFilterPill = ({type, value, removeFilter, is_fetching}: AppliedFilterPillProps) => {
  if (_.isEmpty(value)) return null;
  let text = '';
  if (type === 'query') text = I18n.t('ui.body.filter_pill.query', {value});
  else if (type === 'start' || type === 'end') text = I18n.t(`ui.body.filter_pill.${type}`, {value: formatDateShort(value)});
  else text = I18n.t(`ui.body.filter_pill.${value}`);
  return (
    <div className={style_sheet.pill}>
      <p className={style_sheet.pillText}>{text}</p>
      {is_fetching ? <MBLoader type="spinner"/> : <RemoveIcon onClick={() => removeFilter(type, value)}/>}
    </div>
  );
};

const RemoveIcon = ({...div_props}) => (
  <div className={style_sheet.removeIconWrapper} {...div_props}>
    <svg className={style_sheet.removeIcon} height="16px" width="16px" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <line x1="1" y1="11" x2="11" y2="1" stroke="#FFFFFF" strokeWidth="2"/>
      <line x1="1" y1="1" x2="11" y2="11" stroke="#FFFFFF" strokeWidth="2"/>
    </svg>
  </div>
);

const ClearFilters = ({clearFilters, visible}) => {
  if (!visible) return null;
  return (
    <MBButton button_type="secondary" size="small" onClick={() => clearFilters()}>
      {I18n.t('ui.button.clear_all')}
    </MBButton>
  );
};

const ResultsCount = ({total_count, visible}) => {
  if (!visible) return null;
  return (
    <p className={style_sheet.resultsCount}>
      {I18n.t('ui.body.results', {count: total_count})}
    </p>
  );
};

export default AppliedFilters;
