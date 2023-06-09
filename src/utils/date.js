import dayjs from 'dayjs';

const EVENT_DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'H:mm';
const FORM_DATE_FORMAT = 'DD/MM/YY';
const BASIC_DATE_FORMAT = 'DD/MM/YY HH:mm';

export const convertToEventDateTime = (date) => date.substring(0, date.indexOf('T'));
export const convertToEventDate = (date) => dayjs(date).format(EVENT_DATE_FORMAT);
export const convertToDateTime = (date) => date.substring(0, date.indexOf(':'));
export const convertToTime = (date) => dayjs(date).format(TIME_FORMAT);
export const convertToFormDate = (date) => dayjs(date).format(FORM_DATE_FORMAT);
export const convertToBasicDate = (date) => dayjs(date).format(BASIC_DATE_FORMAT);
