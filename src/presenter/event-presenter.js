import { render } from '../render';
import EventListSortView from '../view/event-list-sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventItemView from '../view/event-item-view';
import NewItemFormView from '../view/event-create-form-view.js';

export default class EventPresenter {
  #container = null;
  #tripPointsModel = null;
  #tripListComponent = new EventListView();
  #tripPoints = [];

  constructor(container, tripPointsModel) {
    this.#tripPointsModel = tripPointsModel;
    this.#container = container;
    this.#tripPoints = [...this.#tripPointsModel.getTripPoints()];
  }

  init() {
    render(new EventListSortView(), this.#container);
    render(this.#tripListComponent, this.#container);

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
  }

  #renderTripPoint = (tripPoint) => {
    const tripPointComponent = new EventItemView({tripPoint});
    const tripPointFormComponent = new NewItemFormView({tripPoint});

    const replacePointToForm = () => {
      this.#tripListComponent.element.replaceChild(tripPointFormComponent.element, tripPointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#tripListComponent.element.replaceChild(tripPointComponent.element, tripPointFormComponent.element);
    };

    const closeEditFormOnEcsKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        replaceFormToPoint();
        document.body.removeEventListener('keydown', closeEditFormOnEcsKey);
      }
    };

    tripPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.body.addEventListener('keydown', closeEditFormOnEcsKey);
    });

    tripPointFormComponent.element.querySelector('.event__save-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.body.removeEventListener('keydown', closeEditFormOnEcsKey);
    });

    tripPointFormComponent.element.querySelector('.event__reset-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.body.removeEventListener('keydown', closeEditFormOnEcsKey);
    });

    render(tripPointComponent, this.#tripListComponent.element);
  };
}
