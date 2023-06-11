export const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export const TRIP_POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const FilterTypeDescriptions = {
  [FILTER_TYPE.EVERYTHING]: 'EVERYTHING',
  [FILTER_TYPE.PAST]: 'PAST',
  [FILTER_TYPE.FUTURE]: 'FUTURE',
};

export const SORT_TYPE = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

export const SortTypeDescription = {
  [SORT_TYPE.DAY]: 'Day',
  [SORT_TYPE.EVENT]: 'Event',
  [SORT_TYPE.TIME]: 'Time',
  [SORT_TYPE.PRICE]: 'Price',
  [SORT_TYPE.OFFER]: 'Offer'
};

export const USER_ACTION = {
  UPDATE_TRIPPOINT: 'UPDATE_WAYPOINT',
  ADD_TRIPPOINT: 'ADD_WAYPOINT',
  DELETE_TRIPPOINT: 'DELETE_WAYPOINT',
};

export const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};
