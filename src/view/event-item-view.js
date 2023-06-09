import AbstractView from '../framework/view/abstract-view.js';
import {convertToDateTime, convertToEventDate, convertToEventDateTime, convertToTime } from '../utils/date.js';
import {getRandomOffers} from '../mock/offers.js';
import { randomDestinations } from '../mock/trip-destination.js';

const createOffersTemplate = (offers) => offers.map((offer) =>
  `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('');


const createEvenItemTemplate = (eventPoint) => {
  const {destination, offers, type} = eventPoint;
  const offersArray = getRandomOffers()
    .find((e) => (e.type === type))['offers']
    .filter((e) => (e.id in offers));
  const eventDateTime = convertToEventDateTime(eventPoint.date_from);
  const eventDate = convertToEventDate(eventPoint.date_from);
  const fromDateTime = convertToDateTime(eventPoint.date_from);
  const fromTime = convertToTime(eventPoint.date_from);
  const toDateTime = convertToDateTime(eventPoint.date_to);
  const toTime = convertToTime(eventPoint.date_to);
  const offersTemplate = createOffersTemplate(offersArray);

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${eventDateTime}">${eventDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${randomDestinations.getDestination(destination).name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${fromDateTime}">${fromTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${toDateTime}">${toTime}</time>
                  </p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${eventPoint.base_price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offersTemplate}
                </ul>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class EventItemView extends AbstractView {

  #tripPoint = null;
  #handleEditClick = null;

  constructor({tripPoint, onEditClick}) {
    super();
    this.#tripPoint = tripPoint;
    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createEvenItemTemplate(this.#tripPoint);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
