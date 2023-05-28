import moment from 'moment-timezone';

import { isMinibarClosed } from '../is_minibar_closed';

const MINIBAR_TIME_ZONE = 'America/New_York';

moment.tz.setDefault(MINIBAR_TIME_ZONE);

describe('isMinibarClosed', () => {
  it('returns true if current day is off', () => {
    const working_hours = [
      {
        wday: moment().day(),
        off: true,
        starts_at: '09:00 am',
        ends_at: '11:59 pm'
      }
    ];
    expect(isMinibarClosed(working_hours)).toEqual(true);
  });

  it('returns true if current minibar time is not between starts_at and ends_at', () => {
    const working_hours = [
      {
        wday: moment().day(),
        off: false,
        starts_at: moment().add(1, 'hours').format('hh:mm a'),
        ends_at: moment().add(2, 'hours').format('hh:mm a')
      }
    ];
    expect(isMinibarClosed(working_hours)).toEqual(true);
  });

  it('returns false if current day is not off and current minibar time is between starts_at and ends_at', () => {
    const working_hours = [
      {
        wday: moment().day(),
        off: false,
        starts_at: moment().subtract(1, 'hours').format('hh:mm a'),
        ends_at: moment().add(1, 'hours').format('hh:mm a')
      }
    ];
    expect(isMinibarClosed(working_hours)).toEqual(false);
  });
});
