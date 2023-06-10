import dayjs from 'dayjs';
import { FilterType } from './filters-and-sorts.js';

export const isFuture = (date) => date && dayjs().isBefore(date, 'D');
export const isPast = (date) => date && dayjs().isAfter(date, 'D');
export const isDatesEqual = (date1, date2) => (!date1 && !date2) || dayjs(date1).isSame(date2, 'D');

export const filter = {
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isFuture(tripPoint.dateFrom)),
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => isPast(tripPoint.dateFrom))
};

export const generateFilter = () => Object.keys(filter).map((filterName) => filterName );
