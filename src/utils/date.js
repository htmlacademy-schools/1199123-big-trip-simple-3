import dayjs from 'dayjs';

const EVENT_DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'H:mm';
const FORM_DATE_FORMAT = 'DD/MM/YY';

export const convertToEventDateTime = (date) => date.substring(0, date.indexOf('T'));
export const convertToEventDate = (date) => dayjs(date).format(EVENT_DATE_FORMAT);
export const convertToDateTime = (date) => date.substring(0, date.indexOf(':'));
export const convertToTime = (date) => dayjs(date).format(TIME_FORMAT);
export const convertToUpperCase = (type) => type.charAt(0).toUpperCase() + type.slice(1);
export const convertToFormDate = (date) => dayjs(date).format(FORM_DATE_FORMAT);
export const convertToLowerCase = (str) => str.toLowerCase();

export const getRandomDate = (maxDate = Date.now()) => {
  const timestamp = Math.floor(Math.random() * maxDate);
  return new Date(timestamp).toISOString();
};

export const isTripDateBeforeToday = (date) => dayjs(date).isBefore(dayjs(), 'D') || dayjs(date).isSame(dayjs(), 'D');

const compareDates = (a, b) => dayjs(a).toDate() - dayjs(b).toDate();

const compareTime = (a, b) => {
  const aDate = dayjs(a);
  const bDate = dayjs(b);

  if (aDate.hour() > bDate.hour()) {
    return bDate.hour() - aDate.hour();
  }

  return aDate.minute() - bDate.minute();
};

export const sortByDay = (a, b) => compareDates(a.date_from, b.date_from);
export const sortByTime = (a, b) => compareTime(a.date_from, b.date_from);
export const sortByPrice = (a, b) => b.base_price - a.base_price;
