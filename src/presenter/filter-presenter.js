import FilterView from '../view/trip-filter-form-view';
import {remove, render, replace} from '../framework/render';
import { FILTER_TYPE, UPDATE_TYPE } from '../utils/filters-and-sorts';
import { filter } from '../utils/filter-main';


export default class FilterPresenter {
  #filterContainer;
  #filterModel;
  #tripEventsModel;
  #filterComponent;

  constructor({filterContainer, filterModel, tripEventModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tripEventsModel = tripEventModel;

    this.#tripEventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return [FILTER_TYPE.EVERYTHING, FILTER_TYPE.FUTURE, FILTER_TYPE.PAST].map((type) => ({
      type,
      count: filter[type](this.#tripEventsModel.tripEvents).length
    }));
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters: this.filters,
      currentFilter: this.#filterModel.filter,
      onFilterChange: this.#handleFilterTypeChange
    });

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  };
}
