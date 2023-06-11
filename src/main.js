import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersModel from './model/filter-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import CreateEventButton from './view/trip-new-point-button-view.js';
import {render} from './framework/render.js';
import PointModel from './model/point-model.js';
import { ApiServer } from './services/points-api-service.js';


const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const headerBlock = document.querySelector('.trip-main');

const AUTHORIZATION = 'Basic Smolentsev';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const tripEventApiService = new ApiServer(END_POINT, AUTHORIZATION);

const tripEventModel = new PointModel({tripEventApiService});

const offerModel = new OffersModel({tripEventApiService});
const destinationModel = new DestinationsModel({tripEventApiService});
const filterModel = new FiltersModel();

const tripPresenter = new TripPresenter(
  tripEventsSection,
  {
    tripEventModel,
    destinationModel,
    offerModel,
    filterModel,
    onCreateTripEventDestroy
  });

const filterPresenter = new FilterPresenter({filterContainer, filterModel, tripEventModel});

const createEventButton = new CreateEventButton({
  onClick: () => {
    tripPresenter.createEvent();
    createEventButton.element.disabled = true;
  }
});

function onCreateTripEventDestroy() {
  createEventButton.element.disabled = false;
} //

tripEventModel.init().finally(() => render(createEventButton, headerBlock));
tripPresenter.init();
filterPresenter.init();
