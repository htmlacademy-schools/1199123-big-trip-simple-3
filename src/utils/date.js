import dayjs from 'dayjs';

const EVENT_DATE_FORMAT = 'MMM D';
const EVENT_TIME_FORMAT = 'H:mm';
const EVENT_YEARS_FORMAT = 'DD/MM/YY HH:mm';

export const getEventDateTime = (date) => date.substring(0, date.indexOf('T'));
export const getEventDate = (date) => dayjs(date).format(EVENT_DATE_FORMAT);
export const convertToDateTime = (date) => date.substring(0, date.indexOf(':'));
export const getDateWithoutT = (date) => date.substring(0, date.indexOf('T'));
export const getDateWithT = (date) => date.substring(0, date.lastIndexOf(':'));
export const getTime = (date) => dayjs(date).format(EVENT_TIME_FORMAT);
export const getDateWithYears = (date) => dayjs(date).format(EVENT_YEARS_FORMAT);
