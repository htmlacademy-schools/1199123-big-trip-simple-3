import { render } from './framework/render.js';
import PointModel from './model/point-model.js';
import { mockInit } from './mock/mock-utils.js';
import { offerTypes } from './mock/mock-const.js';
import EventPresenter from './presenter/event-presenter.js';
import EventFilterFormView from './view/event-filter-form-view.js';

const tripControlsfilters = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');

const [tripPoints, destinations] = mockInit(5, 10);
const offers = offerTypes;
const pointsModel = new PointModel(tripPoints, destinations, offers);

const eventPresenter = new EventPresenter({boardContainer: container, pointsModel});
render(new EventFilterFormView(), tripControlsfilters);

eventPresenter.init();
