import AbstractView from '../framework/view/abstract-view.js';
import { convertToUpperCase, convertToLowerCase } from '../utils/date.js';
import { SORT_TYPE } from '../mock/sort.js';

const createSortItemTemplate = (sortType) =>
  `
  <div class="trip-sort__item  trip-sort__item--${convertToLowerCase(sortType)}">
      <input
        id="sort-${convertToLowerCase(sortType)}"
        class="trip-sort__input visually-hidden"
        type="radio" name="trip-sort"
        value="sort-${convertToLowerCase(sortType)}"
        ${sortType === SORT_TYPE.DAY ? 'checked' : ''}
      >
      <label class="trip-sort__btn" for="sort-${convertToLowerCase(sortType)}" data-sort-type="${sortType}">${convertToUpperCase(sortType)}</label>
    </div>`;

const createSortTemplate = (sorts) => {
  const sortItemsTemplate = sorts.map((sortType) => createSortItemTemplate(sortType)).join('');

  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>
  `;
};

export default class EventListSortView extends AbstractView {

  #sorts = null;

  constructor({sorts}) {
    super();
    this.#sorts = sorts;
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

  get template() {
    return createSortTemplate(this.#sorts);
  }
}
