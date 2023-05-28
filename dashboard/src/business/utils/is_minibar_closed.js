import moment from 'moment-timezone';

const MINIBAR_TIME_ZONE = 'America/New_York';

moment.tz.setDefault(MINIBAR_TIME_ZONE);

export const isMinibarClosed = (workingHours) => {
  const current_minibar_day_of_week = moment().day();
  const current_day = workingHours.find(wd => wd.wday === current_minibar_day_of_week);

  if (current_day.off) return true;

  const current_minibar_time = moment();
  const starts_time = moment(current_day.starts_at, 'HH:mm a');
  const ends_time = moment(current_day.ends_at, 'HH:mm a');

  return !current_minibar_time.isBetween(starts_time, ends_time);
};
