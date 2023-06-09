import { render } from '../framework/render.js';
import EventListSortView from '../view/event-list-sort-view.js';
import { generateSort } from '../mock/sort.js';
import PointPresenter from './point-presenter.js';
import EventNoPointsView from '../view/event-no-points-view.js';

export default class EventPresenter {
  #container = null;
  #tripPointsModel = null;
  #tripListComponent = null;
  #tripPointPresenter = null;
  #tripPoints = null;

  constructor({container, tripPointsModel}) {
    this.#tripPointsModel = tripPointsModel;
    this.#container = container;
    this.#tripPoints = [...this.#tripPointsModel.getTripPoints()];
  }

  #sorters = generateSort();

  init() {
    this.#renderSortingView();
    this.#renderEventsList();

    if (this.#tripPoints.length === 0) {
      render(new EventNoPointsView(), this.#container);
    }

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
  }

  #handleModeChange = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderTripPoint = (tripPoint) => {
    const tripPointPresenter = new PointPresenter(this.#tripListComponent.element,
      tripPoint, {handleModeChange: this.#handleModeChange});
    tripPointPresenter.init();
    this.#tripPointPresenter.set(tripPoint.id, tripPointPresenter);
  };

  #renderSortingView = () => {
    render(new EventListSortView({sorts: this.#sorters}), this.#container);
  };

  #renderEventsList = () => {
    render(this.#tripListComponent, this.#container);
  };
}
