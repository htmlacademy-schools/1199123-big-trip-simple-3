import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeType } from '../utils/item-utils.js';
import { FilterType } from '../utils/constant.js';

const createFilterItemTemplate = (filterType) =>
  `
  <div class="trip-filters__filter">
      <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}">
      <label class="trip-filters__filter-label" for="filter-${filterType}">${capitalizeType(filterType)}</label>
  </div>
  `;

const createFiltersTemplate = () => {
  const filterItems = Object.keys(FilterType).map((filter) => createFilterItemTemplate(filter)).join('');
  return (`
  <form className="trip-filters" action="#" method="get">
    ${filterItems}
    <button className="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );
};

export default class EventFilterFormView extends AbstractView {
  get template() {
    return createFiltersTemplate();
  }
}
