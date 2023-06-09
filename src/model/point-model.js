import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #tripPoints = [];

  constructor (tripPoints) {
    super();
    this.#tripPoints = tripPoints;
  }

  get tripPoints() {
    return this.#tripPoints;
  }

  updateTripPoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting tripPoint');
    }

    this.#tripPoints = [
      ...this.tripPoints.slice(0, index),
      update,
      ...this.#tripPoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addTripPoint(updateType, update) {
    this.#tripPoints = [
      update,
      ...this.#tripPoints
    ];

    this._notify(updateType, update);
  }

  deleteTripPoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Cannot delete unexisting tripPoint');
    }

    this.#tripPoints = [
      ...this.tripPoints.slice(0, index),
      ...this.#tripPoints.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
