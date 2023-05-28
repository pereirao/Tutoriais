// @flow
export type Author = {
  email: string
};

export type Comment = {
  id: number,
  created_at: string, // rails timestamp
  note: string,
  author: Author,
  posted_as: string
};

export * as comment_actions from './actions';
export * as comment_epics from './epics';
export * as comment_helpers from './helpers';
export { default as commentReducer } from './reducer';
export { default as comment_selectors } from './selectors';
