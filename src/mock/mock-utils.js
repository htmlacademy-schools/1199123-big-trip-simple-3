import { generateDestinations } from './trip-destination.js';
import { generatePoints } from './point.js';

export const mockInit = (numberOfPoints, numberOfDestinations) => {
  const destinations = generateDestinations(numberOfDestinations);
  const tripPoints = generatePoints(numberOfPoints);
  return [tripPoints, destinations];
};
