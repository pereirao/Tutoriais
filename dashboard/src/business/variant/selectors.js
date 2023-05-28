//@flow

import { globalizeSelectors } from '../utils/globalizeSelectors';
import type { LocalState } from './reducer';

const LOCAL_PATH = 'variant';

// local selectors
export const listIds = (state: LocalState) => state.list_ids;
export const totalPages = (state: LocalState) => state.total_pages;
export const totalCount = (state: LocalState) => state.total_count;
export const nextPage = (state: LocalState) => state.next_page;
export const query = (state: LocalState) => state.query;
export const filters = (state: LocalState) => state.filters;
export const isFetching = (state: LocalState) => state.is_fetching;
export const isUpdating = (state: LocalState) => state.is_updating;

// global selectors
export default {
  ...globalizeSelectors(LOCAL_PATH, {
    listIds,
    totalPages,
    totalCount,
    nextPage,
    query,
    filters,
    isFetching,
    isUpdating
  })
};
