import { render } from './render.js';
import EventPresenter from './presenter/event-presenter.js';
import EventsFilterView from './view/event-filter-form-view.js';

const filterFormContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const eventPresenter = new EventPresenter();

render(new EventsFilterView(), filterFormContainer);

eventPresenter.init(tripEventsContainer);
