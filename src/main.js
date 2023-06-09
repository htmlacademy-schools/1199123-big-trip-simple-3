import PointModel from './model/point-model.js';
import { mockInit } from './mock/mock-utils.js';
import { offerTypes } from './mock/mock-const.js';
import EventPresenter from './presenter/event-presenter.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import { render } from './render.js';
import NewTripPointButtonView from './view/event-new-point-button-view.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-main');

const [tripPoints, destinations] = mockInit(5, 10);
const pointsModel = new PointModel(tripPoints);
const destinationsModel = new DestinationsModel(destinations);
const offersModel = new OffersModel(offerTypes);
const filterModel = new FilterModel();

const newTripPointButtonComponent = new NewTripPointButtonView({
  onClick: handleNewTripPointButtonClick
});

const eventPresenter = new EventPresenter({
  container,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewTripPointDestroy
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFilters,
  filterModel,
  pointsModel
});


function handleNewTripPointButtonClick() {
  eventPresenter.createTripPoint();
  newTripPointButtonComponent.element.disabled = true;
}

function onNewTripPointDestroy() {
  newTripPointButtonComponent.element.disabled = false;
}

render(newTripPointButtonComponent, siteHeaderElement);
filterPresenter.init();
eventPresenter.init();
