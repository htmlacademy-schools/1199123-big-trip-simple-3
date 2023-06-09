import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../utils/constant.js';

const NoTaskTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now'
};

const createNoPointsTemplate = (filterType) => {
  const noTaskTextValue = NoTaskTextType[filterType];
  return `<p class="trip-events__msg">${noTaskTextValue}</p>`;
};
export default class EventNoPointsView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsTemplate(this.#filterType);
  }
}
