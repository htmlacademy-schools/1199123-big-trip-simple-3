import AbstractView from '../framework/view/abstract-view.js';
import {createElement, render} from '../render.js';

function createEventListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

const createElementTemplate = () => `
  <li class="trip-events__item"></li>
`;
export default class EventListView extends AbstractView {

  get template() {
    return createEventListTemplate();
  }

  addComponent(component) {
    const listElement = createElement(createElementTemplate());
    render(component, listElement);
    this.element.append(listElement);
  }
}
