import {createElement, render} from '../render.js';
import AbstractView from './abstract-view.js';

const createEventListTemplate = () =>
  `<ul class="trip-events__list"></ul>
  `;

const createEventListItemTemplate = () =>
  `<li class="trip-events__item"></li>
  `;

export default class EventsListView extends AbstractView {
  getTemplate = () => createEventListTemplate();

  addComponent(component) {
    const itemTemplate = createElement(createEventListItemTemplate());
    this.getElement().append(itemTemplate);
    render(component, itemTemplate);
  }
}
