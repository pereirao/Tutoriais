//@flow

import _ from 'lodash';
import type { GlobalState } from '../global_state_type';

export const fromRoot = (path: string, selector: Function) => (state: GlobalState, ...args: any) => {
  return selector(_.get(state, path), ...args);
};

// takes a collection of selectors and globalizes all of them.
export const globalizeSelectors = (path: string, selectors: {[string]: Function}) => {
  return Object.keys(selectors).reduce((globalized_selectors: {[string]: Function}, key: string) => ({
    ...globalized_selectors,
    [key]: fromRoot(path, selectors[key])
  }), {});
};
