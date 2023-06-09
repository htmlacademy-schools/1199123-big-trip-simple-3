import { mockTexts, places } from './mock-const.js';
import { getRandomItem, createIDgenerator, getRandomPictureId } from '../utils/item-utils.js';

const NUMBER_OF_PICTURES = Math.floor(Math.random() * 6) + 1;
export const destinations = [];

export const generatePics = () => {
  const pics = [];
  for (let i = 0; i < NUMBER_OF_PICTURES; i++) {
    const pic = {
      src: `img/photos/${getRandomPictureId()}.jpg`,
      description: getRandomItem(mockTexts)
    };
    pics.push(pic);
  }
  return pics;
};

const generateId = createIDgenerator();
export const generateDestinations = (n) => {
  for (let i = 0; i < n; i++) {
    const destination = {
      id: generateId(),
      description: getRandomItem(mockTexts),
      name: getRandomItem(places),
      pictures: generatePics()
    };
    destinations.push(destination);
  }
  return destinations;
};
