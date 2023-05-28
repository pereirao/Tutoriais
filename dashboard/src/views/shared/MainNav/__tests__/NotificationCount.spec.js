import React from 'react';

import { NotificationCount } from '../NotificationCount';

it('renders 1 digit correctly', () => {
  expect(shallow(<NotificationCount notice_count={1} />)).toMatchSnapshot();
});

it('renders 2 digits correctly', () => {
  expect(shallow(<NotificationCount notice_count={10} />)).toMatchSnapshot();
});

it('renders 3 digits correctly', () => {
  expect(shallow(<NotificationCount notice_count={101} />)).toMatchSnapshot();
});
