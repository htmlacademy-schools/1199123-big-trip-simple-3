import dayjs from 'dayjs';
import { FILTER_TYPE } from './filters-and-sorts.js';

export const isFuture = (date) => date && dayjs().isBefore(date, 'D');
export const isPast = (date) => date && dayjs().isAfter(date, 'D');
export const isDatesEqual = (date1, date2) => (!date1 && !date2) || dayjs(date1).isSame(date2, 'D');

export const filter = {
  [FILTER_TYPE.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isFuture(tripPoint.dateFrom)),
  [FILTER_TYPE.EVERYTHING]: (tripPoints) => tripPoints,
  [FILTER_TYPE.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => isPast(tripPoint.dateFrom))
};

export const generateFilter = () => Object.keys(filter).map((filterName) => filterName );
