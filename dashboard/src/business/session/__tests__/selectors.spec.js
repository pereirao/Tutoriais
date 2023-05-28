import {
  currentSupplier,
  isFetchingMe,
  myName,
  storeRating,
  supplierName,
  shippingMethods,
  userIsLoggedIn
} from '../selectors';
import me_factory from './me.factory';

// Note that I'm testing the local versions of these selectors

describe('currentSupplier', () => {
  const me = me_factory.build({supplier: {stubbed_attribute: 'stubbed_value'}});
  const state = {me};
  it('returns the current supplier object associated with me', () => {
    expect(currentSupplier(state)).toEqual({stubbed_attribute: 'stubbed_value'});
  });
});

describe('isFetchingMe', () => {
  it('returns the true if fetching', () => {
    const state = { is_fetching_me: true };
    expect(isFetchingMe(state)).toEqual(true);
  });
  it('returns the false if not fetching', () => {
    const state = { is_fetching_me: false };
    expect(isFetchingMe(state)).toEqual(false);
  });
});

describe('myName', () => {
  const me = me_factory.build({name: 'David Bowie'});
  const state = {me};
  it('returns the name associated with me', () => {
    expect(myName(state)).toEqual('David Bowie');
  });
});

describe('shippingMethods', () => {
  const shipping_method = {type: 'shipped', opens_at: 'stub_open', closes_at: 'stub_close'};
  const me = me_factory.build({supplier: {shipping_methods: [shipping_method] } });
  const state = {me};
  it('returns the shipping methods associated with me', () => {
    expect(shippingMethods(state)).toEqual([shipping_method]);
  });
});

describe('storeRating', () => {
  const me = me_factory.build({supplier: {metrics: {score: 3.5} } });
  const state = {me};
  it('returns the store rating associated with me', () => {
    expect(storeRating(state)).toEqual(3.5);
  });
});

describe('supplierName', () => {
  const me = me_factory.build({supplier: {name: 'Ground Control'} });
  const state = {me};
  it('returns the supplier name associated with me', () => {
    expect(supplierName(state)).toEqual('Ground Control');
  });
});


describe('userIsLoggedIn', () => {
  it('returns true if me is truthy', () => {
    const me = me_factory.build();
    const state = {me};
    expect(userIsLoggedIn(state)).toEqual(true);
  });
  it('returns false if me is falsy', () => {
    const state = {me: null};
    expect(userIsLoggedIn(state)).toEqual(false);
  });
});
