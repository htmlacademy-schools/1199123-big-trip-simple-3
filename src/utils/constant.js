export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export const FilterTypeDescriptions = {
  [FilterType.EVERYTHING]: 'EVERYTHING',
  [FilterType.PAST]: 'PAST',
  [FilterType.FUTURE]: 'FUTURE',
};

export const SortTypeForDrawing = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

export const SortType = {
  DAY: 'sort-day',
  EVENT: 'sort-event',
  TIME: 'sort-time',
  PRICE: 'sort-price',
  OFFER: 'sort-offer'
};

export const UserAction = {
  UPDATE_TRIPPOINT: 'UPDATE_TRIPPOINT',
  ADD_TRIPPOINT: 'ADD_TRIPPOINT',
  DELETE_TRIPPOINT: 'DELETE_TRIPPOINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};
