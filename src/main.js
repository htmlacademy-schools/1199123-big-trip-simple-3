import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/point-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import {render} from './render';
import NewPointButton from './view/trip-new-point-button-view';
import WaypointsApiService from '../points-api-service';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');
const placeForButton = document.querySelector('.trip-main');

const AUTHORIZATION = 'Basic smolentsev';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const waypointsApiService = new WaypointsApiService(END_POINT, AUTHORIZATION);

const modelWaypoints = new PointModel({waypointsApiService});
const modelOffers = new OffersModel({waypointsApiService});
const modelDestinations = new DestinationsModel({waypointsApiService});
const modelFilter = new FilterModel();

const tripPresenter = new TripPresenter({
  boardContainer: container,
  waypointsModel: modelWaypoints,
  modelOffers,
  modelDestinations,
  modelFilter,
  onNewWaypointDestroy: handleNewTaskFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  modelFilter,
  modelWaypoints
});

const newPointButtonComponent = new NewPointButton({
  onClick: handleNewTaskButtonClick
});

function handleNewTaskFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewTaskButtonClick() {
  tripPresenter.createWaypoint();
  newPointButtonComponent.element.disabled = true;
}

filterPresenter.init();
tripPresenter.init();
modelWaypoints.init()
  .finally(() => {
    render(newPointButtonComponent, placeForButton);
  });
