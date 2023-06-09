import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinations = [];

  constructor (destinations) {
    super();
    this.#destinations = destinations;
  }

  get destinations() {
    return this.#destinations;
  }
}
