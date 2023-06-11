import { sortByDay, sortByPrice, sortByTime } from './date';
import { SORT_TYPE } from './const';

const offOptions = ['event', 'offer'];
export const isSelectedOption = (sortType) => (offOptions.includes(sortType) ? 'disabled' : '');

export const SORTS = {
  [SORT_TYPE.DAY]: sortByDay,
  [SORT_TYPE.EVENT]: undefined,
  [SORT_TYPE.TIME]: sortByTime,
  [SORT_TYPE.PRICE]: sortByPrice,
  [SORT_TYPE.OFFER]: undefined
};
