import EventNoPointsView from '../view/event-no-points-view.js';
import { RenderPosition, render, remove } from '../framework/render.js';
import TripPointPresenter from './point-presenter.js';
import EventListView from '../view/event-list-view.js';
import { SortType, FilterType, UpdateType, UserAction } from '../utils/constant.js';
import { sorts } from '../utils/sort.js';
import EventListSortView from '../view/event-list-sort-view.js';
import { filter } from '../utils/filter.js';
import NewTripPointPresenter from './new-point-presenter.js';

export default class EventPresenter {
  #boardContainer = null;
  #tripPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #tripPointsListComponent = new EventListView();
  #noTripPointComponent = null;
  #sortComponent = null;
  #tripPointPresenter = new Map();
  #newTripPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({boardContainer, tripPointsModel, destinationsModel, offersModel, filterModel, onNewTripPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newTripPointPresenter = new NewTripPointPresenter({
      tripPointListContainer: this.#tripPointsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTripPointDestroy
    });

    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

  }

  get tripPoints() {
    this.#filterType = this.#filterModel.filter;
    const tripPoints = this.#tripPointsModel.tripPoints;
    const filteredTripPoints = filter[this.#filterType](tripPoints);
    return (sorts[this.#currentSortType]) ? filteredTripPoints.sort(sorts[this.#currentSortType]) : filteredTripPoints;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  init() {
    this.#renderBoard();
  }

  createTripPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newTripPointPresenter.init(this.destinations, this.offers);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.ADD_TRIPPOINT:
        this.#tripPointsModel.addTripPoint(updateType, update);
        break;
      case UserAction.UPDATE_TRIPPOINT:
        this.#tripPointsModel.updateTripPoint(updateType, update);
        break;
      case UserAction.DELETE_TRIPPOINT:
        this.#tripPointsModel.deleteTripPoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#tripPointPresenter.get(data.id).init(data, this.destinations, this.offers);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();

        break;
    }
  };

  #renderNoTripPoints() {
    this.#noTripPointComponent = new EventNoPointsView({
      filterType: this.#filterType
    });
    render(this.#noTripPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN );
  }

  #handleModeChange = () => {
    this.#newTripPointPresenter.destroy();
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new EventListSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTripPoint(tripPoint) {
    const tripPointPresenter = new TripPointPresenter({
      tripPointList: this.#tripPointsListComponent.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleViewAction
    });

    tripPointPresenter.init(tripPoint, this.destinations, this.offers);
    this.#tripPointPresenter.set(tripPoint.id, tripPointPresenter);
  }


  #renderTripPoints(tripPoints) {
    tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint));
  }

  #clearBoard(resetSortType = false) {

    this.#newTripPointPresenter.destroy();
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();

    remove(this.#sortComponent);

    if(this.#noTripPointComponent) {
      remove(this.#noTripPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    const tripPoints = this.tripPoints;

    if (tripPoints.length === 0) {
      this.#renderNoTripPoints();
      return;
    }

    this.#renderSort();
    render(this.#tripPointsListComponent, this.#boardContainer);
    this.#renderTripPoints(tripPoints);
  }
}
