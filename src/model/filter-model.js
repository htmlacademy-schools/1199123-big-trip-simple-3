import Observable from '../framework/observable';
import { FILTER_TYPE } from '../utils/const';

export default class FiltersModel extends Observable {
  #filter = FILTER_TYPE.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
