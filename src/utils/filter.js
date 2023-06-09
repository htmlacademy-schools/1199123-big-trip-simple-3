import dayjs from 'dayjs';
import { FilterType } from './constant.js';

const isTripOutdated = (date) => dayjs(date).isBefore(dayjs(), 'D') || dayjs(date).isSame(dayjs(), 'D');

const filter = {
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isTripOutdated(tripPoint.dateFrom)),
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
};

export const generateFilter = () => Object.keys(filter).map((filterName) => filterName );
