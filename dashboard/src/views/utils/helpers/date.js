// @flow

import moment from 'moment';
import I18n from '../../../localization';

// returns number of hours between to ISO 8601 timestamps
export const differenceInHours = (date_one: string, date_two: string) => (
  moment.parseZone(date_one).diff(moment.parseZone(date_two), 'hours')
);

// returns whether ISO 8601 timestamp is today in it's own timezone
export const isToday = (date: string) => {
  const date_moment = moment.parseZone(date);
  return todayWithUTCOffset(date_moment.utcOffset()).isSame(date_moment, 'day');
};

// returns moment instance of the current instant with the given offset from utc
export const todayWithUTCOffset = (offset: number) => moment().utcOffset(offset);

// takes a moment and returns integer number of minutes between now and that moment
export const minutesAgo = (date: Object) => {
  const now_moment = moment().utcOffset(moment.parseZone(date).utcOffset());
  return now_moment.diff(date, 'minutes');
};

// takes a timestamp and integer number of minutes and
// returns whether it is currently past (timestamp - minute_threshold)
export const nowIsWithinMinuteThreshold = (date: string, minute_threshold) => {
  const date_moment = moment.parseZone(date);
  const now_moment = moment().utcOffset(date_moment.utcOffset());
  return date_moment.diff(now_moment, 'minutes') <= minute_threshold;
};

/************************************************
* These functions take timestamps strings in the
* format returned from the server (ISO 8601)
* and return formatted display strings
*************************************************/

export const formatTimestamp = (time: string) => (
  I18n.t('ui.body.timestamp', {time: formatTime(time), date: formatDateShort(time)})
); // e.g. 12:00 AM on 01/01/2017

export const formatTime = (time: ?string) => {
  if (!time) return '';
  return moment.parseZone(time).format('h[:]mm A'); // e.g. 12:00 PM
};

export const formatWindow = (start: ?string, end: ?string) => {
  const start_string = formatTime(start).replace(/:00/, '');
  const end_string = formatTime(end).replace(/:00/, '');
  if (start_string[start_string.length - 2] === end_string[end_string.length - 2]){ // same median indicator
    return `${start_string.slice(0, start_string.length - 3)} - ${end_string}`; // e.g. 11 - 12 PM || 8:30 - 9:30 PM
  } else {
    return `${start_string} - ${end_string}`; // e.g. 11 AM - 1 PM || 11:30 PM - 1:30 AM
  }
};

export const formatTimeWithMinuteOffset = (time: ?string, minute_offset: number) => {
  if (!time) return '';
  return moment.parseZone(time).add(minute_offset, 'minutes').format('h[:]mm A'); // e.g. 12:00 PM
};

export const formatDateAbbreviation = (date: string) => {
  if (!date) return '';
  return `${formatDayNameAbbreviation(date)} ${moment.parseZone(date).format('M[/]DD')}`; // e.g. 5/05
};

export const formatDateShort = (date: string) => {
  if (!date) return '';
  return moment.parseZone(date).format('MM[/]DD[/]Y'); // e.g. 05/05/2017
};

export const formatDateLong = (date: string) => (
  `${formatDayName(date)}, ${formatDateShort(date)}` // e.g. Today, 05/05/2017 || Thursday, 05/05/2017
);

export const formatDayName = (date: string) => {
  let day_name = I18n.t(`system.day.${moment.parseZone(date).format('dddd')}`);
  if (isToday(date)) day_name = I18n.t('system.day.today');
  return day_name; // e.g. today || Thursday
};

export const formatDayNameAbbreviation = (date: string) => (
  I18n.t(`system.day.${moment.parseZone(date).format('ddd')}`)
);
