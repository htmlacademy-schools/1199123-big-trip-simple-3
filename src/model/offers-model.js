import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #waypointsApiService = null;
  #offers = [];

  constructor ({waypointsApiService}) {
    super();
    this.#waypointsApiService = waypointsApiService;
    this.init();
  }

  async init() {
    try {
      this.#offers = await this.#waypointsApiService.offers;
    } catch (err) {
      this.#offers = [];
    }
  }

  get offers() {
    return this.#offers;
  }
}
