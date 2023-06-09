import {render} from './render.js';
import EventPresenter from './presenter/event-presenter.js';
import EventFilterFormView from './view/event-filter-form-view.js';
import TripPointModel from './model/model.js';

const filters = document.querySelector('.trip-controls__filters');
render(new EventFilterFormView(), filters);

const container = document.querySelector('.trip-events');

const tripPointsModel = new TripPointModel();
const presenter = new EventPresenter(tripPointsModel);

presenter.init(container);
