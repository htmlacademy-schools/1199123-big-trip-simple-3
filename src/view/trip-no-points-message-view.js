import AbstractView from '../framework/view/abstract-view';

const createNoPointsMessageTemplate = (text) => `<p class="trip-events__msg">${text}</p>`;

export default class NoPointsMessageView extends AbstractView {
  #message;

  constructor(message = 'Click New Event to create your first point') {
    super();
    this.#message = message;
  }

  get template() {
    return createNoPointsMessageTemplate(this.#message);
  }
}
