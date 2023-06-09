import { getRandomItem, getRandomPrice, createIDgenerator } from '../utils/item-utils.js';
import { pointTypes, dates } from './mock-const.js';
import { destinations } from './trip-destination.js';
import { getRandomOffersIdsByType } from '../utils/offers.js';


export const points = [];

const generatePointId = createIDgenerator();
export const generatePoints = (n) => {
  for (let i = 0; i < n; i++) {
    const tripDates = getRandomItem(dates);
    const type = getRandomItem(pointTypes);
    const point = {
      basePrice: getRandomPrice(),
      dateFrom: tripDates.dateFrom,
      dateTo: tripDates.dateTo,
      destination: getRandomItem(destinations).id,
      id: generatePointId(),
      offersIDs: getRandomOffersIdsByType(type),
      type
    };
    points.push(point);
  }
  return points;
};
