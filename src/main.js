import { render } from './framework/render.js';
import EventPresenter from './presenter/event-presenter.js';
import EventFilterFormView from './View/event-filter-form-view.js';
import TripPointModel from './model/model.js';
import { generateSort } from './mock/sort.js';
import { generateFilter } from './mock/filter.js';

const filters = document.querySelector('.trip-controls__filters');

const container = document.querySelector('.trip-events');

const tripPointsModel = new TripPointModel();
const sorts = generateSort();
const presenter = new EventPresenter({container, tripPointsModel, sorts});

render(new EventFilterFormView(generateFilter()), filters);
presenter.init();
