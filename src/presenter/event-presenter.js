import EventNoPointsView from '../view/event-no-points-view.js';
import { RenderPosition, render } from '../framework/render.js';
import TripPointPresenter from './point-presenter.js';
import EventListView from '../view/event-list-view.js';
import { SortType } from '../utils/constant.js';
import { sorts } from '../utils/sort.js';
import EditFormView from '../view/event-edit-form-view.js';
import EventListSortView from '../view/event-list-sort-view.js';

export default class EventPresenter {
  #boardContainer = null;
  #tripPointsModel = null;
  #tripPoints = null;
  #destinations = null;
  #offers = null;

  #tripPointsListComponent = new EventListView();
  #noTripPointComponent = new EventNoPointsView();
  #sortComponent = new EventListSortView();
  #tripPointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedTripPoints = [];

  constructor({boardContainer, tripPointsModel}) {
    this.#boardContainer = boardContainer;
    this.#tripPointsModel = tripPointsModel;
  }

  init() {
    this.#tripPoints = [...this.#tripPointsModel.tripPoints];
    this.#destinations = [...this.#tripPointsModel.destinations];
    this.#offers = [...this.#tripPointsModel.offers];
    this.#renderBoard();
    this.#sourcedTripPoints = [...this.#tripPointsModel.tripPoints];
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderNoTripPoints() {
    render(this.#noTripPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN );
  }

  #handleModeChange = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };

  #sortTripPoints(sortType) {
    if (sorts[sortType]) {
      this.#tripPoints.sort(sorts[sortType]);
    } else {
      this.#tripPoints = [...this.#sourcedTripPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTripPoints(sortType);

    this.#clearTripPointList();
    this.#renderTripPoints();
  };

  #renderTripPoint(tripPoint) {
    const tripPoinPresenter = new TripPointPresenter({
      tripPointList: this.#tripPointsListComponent.element,
      onModeChange: this.#handleModeChange
    });

    tripPoinPresenter.init(tripPoint, this.#destinations, this.#offers);
    this.#tripPointPresenter.set(tripPoint.id, tripPoinPresenter);
  }


  #renderTripPoints() {
    render(this.#tripPointsListComponent, this.#boardContainer);
    this.#tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint));
  }


  #renderBoard() {

    if (this.#tripPoints.length === 0) {
      this.#renderNoTripPoints();
      return;
    }
    this.#renderSort();

    render(new EditFormView({tripPoint: this.#tripPoints[0], destinations: this.#destinations, offers: this.#offers, isEditForm: false}), this.#tripPointsListComponent.element);
    this.#renderTripPoints();

  }

  #clearTripPointList() {
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();
  }
}
