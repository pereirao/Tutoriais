import moment from 'moment';
import MockDate from 'mockdate';
import {
  ratingClass,
  isMethodClosed,
  supplierOpenMessage,
  shippingProviderOptions,
  MINIMUM_GOOD_RATING,
  MAXIMUM_BAD_RATING
} from '../helpers';
import me_factory from './me.factory';

describe('ratingClass', () => {
  it('returns goodRating if greater than or equal to minimum good rating', () => {
    expect(ratingClass(MINIMUM_GOOD_RATING)).toEqual('good');
  });

  it('returns mehRating if les than minimum good rating and greater than maximum bad rating', () => {
    const meh_rating = MINIMUM_GOOD_RATING - ((MINIMUM_GOOD_RATING - MAXIMUM_BAD_RATING) / 2);
    expect(ratingClass(meh_rating)).toEqual('meh');
  });

  it('returns badRating if less than or equal to maximum bad rating', () => {
    expect(ratingClass(MAXIMUM_BAD_RATING)).toEqual('bad');
  });
});

describe('isMethodClosed', () => {
  const mock_date = moment('2017-01-01').add(1, 'hours'); // methods don't open until 2am by factory default
  MockDate.set(mock_date);

  it('returns true if closed', () => {
    const me = me_factory.build();
    expect(isMethodClosed(me.supplier.shipping_methods[0])).toEqual(true);
  });

  it('returns false if not currently closed', () => {
    const me = me_factory.build('always_open'); // methods open at midnight an
    expect(isMethodClosed(me.supplier.shipping_methods[0])).toEqual(false);
  });
});

describe('supplierOpenMessage', () => {
  const mock_date = moment('2017-01-01').add(1, 'hours'); // methods don't open until 2am by factory default
  MockDate.set(mock_date);

  it('returns string for on_demand and pickup open', () => {
    const me = me_factory.build('always_open');
    expect(supplierOpenMessage(me.supplier.shipping_methods)).toEqual('open for delivery until 12:00 AM ・ open for pickup until 12:00 AM');
  });

  it('returns string for on_demand closed and pickup open', () => {
    const me = me_factory.build('all_but_on_demand');
    expect(supplierOpenMessage(me.supplier.shipping_methods)).toEqual('closed for delivery until 2:00 AM ・ open for pickup until 12:00 AM');
  });

  it('returns string for on_demand open and pickup closed', () => {
    const me = me_factory.build('only_on_demand');
    expect(supplierOpenMessage(me.supplier.shipping_methods)).toEqual('open for delivery until 12:00 AM ・ closed for pickup until 2:00 AM');
  });

  it('returns string for on_demand closed and pickup closed', () => {
    const me = me_factory.build('only_shipped');
    expect(supplierOpenMessage(me.supplier.shipping_methods)).toEqual('closed for delivery until 2:00 AM ・ closed for pickup until 2:00 AM');
  });
});

describe('shippingProviderOptions', () => {
  it('returns shipping provider options', () => {
    const shipping_providers = ['FedEx', 'UPS'];
    const me = me_factory.build({supplier: {shipping_providers} });
    expect(shippingProviderOptions(me.supplier)).toEqual([
      {text: 'FedEx', value: 'FedEx'},
      {text: 'UPS', value: 'UPS'}
    ]);
  });
});
