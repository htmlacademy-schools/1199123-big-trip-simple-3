import { getRandomSliceFromItems } from './item-utils.js';
import { offerTypes } from '../mock/mock-const.js';

export const getOffersByType = (type) => offerTypes.find((offers) => offers.type === type).offers;

export const getRandomOffersIdsByType = (type) => {
  const currentTypeRandomOffers = getRandomSliceFromItems(getOffersByType(type));
  return currentTypeRandomOffers.map((offer) => offer.id);
};
