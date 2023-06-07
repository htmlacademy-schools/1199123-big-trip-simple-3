import { render } from '../render.js';

import EventsFormView from '../view/event-list-edit-view.js';
import EventsListView from '../view/event-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventListSortView from '../view/event-list-sort-view.js';

export default class EventPresenter {
  eventsListView = new EventsListView();
  #container = null;

  init = (container) => {
    this.#container = container;

    render(new EventListSortView(), this.#container);

    this.eventsListView.addComponent(new EventsFormView());

    for (let i = 0; i < 3; i++) {
      this.eventsListView.addComponent(new EventItemView());
    }

    render(this.eventsListView, this.#container);
  };
}
