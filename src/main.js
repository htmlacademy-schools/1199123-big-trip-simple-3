import { render } from './framework/render.js';
import EventPresenter from './presenter/event-presenter.js';
import EventFilterFormView from './view/event-filter-form-view.js';
import TripPointModel from './model/model.js';
import { generateFilter } from './mock/filter.js';

const tripControlsfilters = document.querySelector('.trip-controls__filters');

const container = document.querySelector('.trip-events');
const tripPointsModel = new TripPointModel();
const presenter = new EventPresenter({container, tripPointsModel});
const filters = generateFilter(tripPointsModel.tripPoints);

render(new EventFilterFormView({filters}), tripControlsfilters);
presenter.init();
