import {render} from './framework/render.js';
import TripPointModel from './model/point-model.js';
import { ApiServer } from '../points-api-service.js';
import ModelOffer from './model/offers-model.js';
import ModelDestinations from './model/destinations-model.js';
import ModelFilters from './model/filter-model.js';
import MainPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import CreateTripEventButton from './view/trip-new-point-button-view.js';


const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const headerBlock = document.querySelector('.trip-main');

const AUTHORIZATION = 'Basic Smolentsev';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const tripEventApiService = new ApiServer(END_POINT, AUTHORIZATION);

const tripEventModel = new TripPointModel({tripEventApiService});

const offerModel = new ModelOffer({tripEventApiService});
const destinationModel = new ModelDestinations({tripEventApiService});
const filterModel = new ModelFilters();

const tripPresenter = new MainPresenter(
  tripEventsSection,
  {
    tripEventModel,
    destinationModel,
    offerModel,
    filterModel,
    onCreateTripEventDestroy
  });

const filterPresenter = new FilterPresenter({filterContainer, filterModel, tripEventModel});

const createTripEventButton = new CreateTripEventButton({
  onClick: () => {
    tripPresenter.createEvent();
    createTripEventButton.element.disabled = true;
  }
});

function onCreateTripEventDestroy() {
  createTripEventButton.element.disabled = false;
} // function so it can be used in trip presenter

tripEventModel.init().finally(() => render(createTripEventButton, headerBlock));
tripPresenter.init();
filterPresenter.init();
