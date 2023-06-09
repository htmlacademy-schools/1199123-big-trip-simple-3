import {remove, render, RenderPosition} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import EventListView from '../view/trip-list-view.js';
import ListSortView from '../view/trip-list-sort-view.js';
import LoadingView from '../view/trip-loading-view.js';
import NewPointPresenter from './new-point-presenter';
import {PointPresenter} from './point-presenter';
import NoPointsMessageView from '../view/trip-no-points-message-view.js';
import { FILTER_TYPE, SORT_TYPE, UPDATE_TYPE, USER_ACTION } from '../utils/const.js';
import { filter } from '../utils/filter-main.js';
import { SORTS } from '../utils/sort.js';


const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripPresenter {
  #tripContainer;
  #tripPointModel;
  #destinationModel;
  #offerModel;
  #filterModel;
  #createTripPointPresenter;
  #noPointsView;
  #onCreateTripEventDestroy;
  #tripPointsListComponent = new EventListView();
  #tripPoints = [];
  #filterType = FILTER_TYPE.EVERYTHING;
  #tripPointPresenter = new Map();
  #isLoading = true;
  #sortComponent = new ListSortView({sorts: SORTS, current: SORT_TYPE.DAY});
  #loadingComponent = new LoadingView();
  #currentSortType = SORT_TYPE.DAY;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor(
    container,
    {
      tripEventModel,
      destinationModel,
      offerModel,
      filterModel,
      onCreateTripEventDestroy
    }) {
    this.#tripContainer = container;
    this.#tripPointModel = tripEventModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#filterModel = filterModel;
    this.#onCreateTripEventDestroy = onCreateTripEventDestroy;

    tripEventModel.init();
    this.#tripPoints = [...tripEventModel.tripEvents];

    this.#tripPointModel.addObserver(this.#handleModelPoint);
    this.#destinationModel.addObserver(this.#handleModelPoint);
    this.#filterModel.addObserver(this.#handleModelPoint);
  }

  get tripEvents() {
    this.#filterType = this.#filterModel.filter;
    const filteredEvents = filter[this.#filterType](
      this.#tripPointModel.tripEvents.sort(SORTS[SORT_TYPE.DAY])
    );
    return (SORTS[this.#currentSortType]) ? filteredEvents.sort(SORTS[this.#currentSortType]) : filteredEvents;
  }

  get destinations() {
    return this.#destinationModel.destinations;
  }

  get offers() {
    return this.#offerModel.offers;
  }

  createEvent = () => {
    this.#currentSortType = SORT_TYPE.DAY;
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
    this.#createTripPointPresenter = new NewPointPresenter({
      tripEventsListContainer: this.#tripPointsListComponent.element,
      onDataChange: this.#handleUserAction,
      onDestroy: this.#onCreateTripEventDestroy,
      onReset: this.#handleCreateEventFormClose
    });
    this.#createTripPointPresenter.init({destinations: this.destinations, offers: this.offers});
  };

  #renderTripPoint = (tripEvent) => {
    const container = this.#tripPointsListComponent.element;
    const tripEventPresenter = new PointPresenter({
      tripPointList: container,
      tripPoint: tripEvent,
      handleModeChange: this.#handleModeChange,
      destinations: this.destinations,
      offers: this.offers,
      onDataChange: this.#handleUserAction
    });
    tripEventPresenter.init();
    this.#tripPointPresenter.set(tripEvent.id, tripEventPresenter);
  };

  #renderSortingView = () => {
    this.#sortComponent.changeCurrentType(this.#currentSortType);
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderEventsList = () => {
    render(this.#tripPointsListComponent, this.#tripContainer);
    const tripEventsList = this.tripEvents;
    for (let i = 0; i < this.#tripPoints.length; i++) {
      try {
        this.#renderTripPoint(tripEventsList[i]);
      } catch (e) { //
      }
    }
  };

  #renderPreloader = () => {
    render(this.#loadingComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderNoEvents = () => {
    if (this.#filterType === FILTER_TYPE.FUTURE) {
      this.#noPointsView = new NoPointsMessageView('There are no future events now');
    } else if (this.#filterType === FILTER_TYPE.PAST) {
      this.#noPointsView = new NoPointsMessageView('There are no past events now');
    } else {
      this.#noPointsView = new NoPointsMessageView();
    }
    render(this.#noPointsView, this.#tripContainer);
  };

  #render = () => {
    if (this.#isLoading || !this.destinations || !this.offers) {
      this.#renderPreloader();
      return;
    }

    this.#tripPoints = this.#tripPointModel.tripEvents;

    if (this.tripEvents.length === 0) {
      this.#renderNoEvents();
      return;
    }
    this.#renderSortingView();
    this.#renderEventsList();
  };


  #clear = (resetSortType) => {
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();

    if (this.#noPointsView) {
      remove(this.#noPointsView);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DAY;
    }
    remove(this.#sortComponent);
  };

  init() {
    this.#render();
  }

  #handleModelPoint = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#tripPointPresenter.get(data.id).init(data, this.destinations, this.offers);
        break;
      case UPDATE_TYPE.MINOR:
        this.#clear();
        this.#render();
        break;
      case UPDATE_TYPE.MAJOR:
        this.#clear(true);
        this.#render();
        break;
      case UPDATE_TYPE.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clear();
        this.#render();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clear();
    this.#renderSortingView();
    this.#renderEventsList();
  };

  #handleUserAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case USER_ACTION.ADD_TRIPPOINT:
        this.#createTripPointPresenter.setSaving();
        try {
          await this.#tripPointModel.addTripPoint(updateType, update);
        } catch (err) {
          this.#tripPointPresenter.get(update.id).setAborting();
        }
        break;
      case USER_ACTION.UPDATE_TRIPPOINT:
        this.#tripPointPresenter.get(update.id).setSaving();
        try {
          await this.#tripPointModel.updateTripPoint(updateType, update);
        } catch (err) {
          this.#tripPointPresenter.get(update.id).setAborting();
        }
        break;
      case USER_ACTION.DELETE_TRIPPOINT:
        this.#tripPointPresenter.get(update.id).setDeleting();
        try {
          await this.#tripPointModel.deleteTripPoint(updateType, update);
        } catch (err) {
          this.#tripPointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleCreateEventFormClose = () => {
    this.#createTripPointPresenter.destroy();
    this.#createTripPointPresenter = null;
  };

  #handleModeChange = () => {
    if (this.#createTripPointPresenter) {
      this.#handleCreateEventFormClose();
    }
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };
}
