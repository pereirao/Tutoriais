import React from 'react';

import { OrderStateForm } from '../OrderStateForm';

describe('order of on_demand delivery_method_type state transitions', () => {
  it('renders form for transitioning to scheduled state', () => {
    expect(shallow(<OrderStateForm delivery_method_type="on_demand" proposed_state="scheduled" is_gift={false} />)).toMatchSnapshot();
  });
  it('renders form for transitioning to confirmed state', () => {
    expect(shallow(<OrderStateForm delivery_method_type="on_demand" proposed_state="confirmed" is_gift={false} />)).toMatchSnapshot();
  });
  it('renders form for transitioning to en_route state', () => {
    expect(shallow(<OrderStateForm delivery_method_type="on_demand" proposed_state="en_route" is_gift={false} />)).toMatchSnapshot();
  });
  it('renders form for transitioning to delivered state for non-gift order', () => {
    expect(shallow(<OrderStateForm delivery_method_type="on_demand" proposed_state="delivered" is_gift={false} />)).toMatchSnapshot();
  });
  it('renders form for transitioning to delivered state for gift order', () => {
    expect(shallow(<OrderStateForm delivery_method_type="on_demand" proposed_state="delivered" is_gift />)).toMatchSnapshot();
  });
});

describe('order of pickup delivery_method_type state transitions', () => {
  it('renders form for transitioning to scheduled state', () => {
    expect(shallow(<OrderStateForm delivery_method_type="pickup" proposed_state="scheduled" is_gift={false} />)).toMatchSnapshot();
  });
  it('renders form for transitioning to confirmed state', () => {
    expect(shallow(<OrderStateForm delivery_method_type="pickup" proposed_state="confirmed" is_gift={false} />)).toMatchSnapshot();
  });
  it('renders form for transitioning to en_route state', () => {
    expect(shallow(<OrderStateForm delivery_method_type="pickup" proposed_state="en_route" is_gift={false} />)).toMatchSnapshot();
  });
  it('renders form for transitioning to delivered state', () => {
    expect(shallow(<OrderStateForm delivery_method_type="pickup" proposed_state="delivered" is_gift={false} />)).toMatchSnapshot();
  });
});


describe('order of shipped delivery_method_type state transitions', () => {
  it('renders form for transitioning to confirmed state', () => {
    expect(shallow(<OrderStateForm delivery_method_type="shipped" proposed_state="confirmed" is_gift={false} />)).toMatchSnapshot();
  });
  it('renders form for transitioning to delivered state', () => {
    expect(shallow(<OrderStateForm delivery_method_type="shipped" proposed_state="delivered" is_gift={false} />)).toMatchSnapshot();
  });
});
