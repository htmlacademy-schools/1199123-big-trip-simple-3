import { render, replace } from '../framework/render.js';
import EventListSortView from '../view/event-list-sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventItemView from '../view/event-item-view';
import NewItemFormView from '../view/event-create-form-view.js';
import EventNoPointsView from '../view/event-no-points-view.js';
import EventEditPointView from '../view/event-edit-point-view.js';

export default class EventPresenter {
  #container = null;
  #tripPointsModel = null;
  #tripListComponent = null;
  #sorters = null;

  constructor({container, tripPointsModel, sorters}) {
    this.#tripPointsModel = tripPointsModel;
    this.#container = container;
    this.#sorters = sorters;
  }

  init() {

    const tripPoints = [...this.#tripPointsModel.getTripPoints()];

    if (tripPoints.length === 0) {
      render(new EventNoPointsView(), this.#container);
    } else {
      this.#tripListComponent = new EventListView();
      render(new EventListSortView(this.#sorters), this.#container);
      render(this.#tripListComponent, this.#container);
      render(new NewItemFormView(tripPoints[0]), this.#tripListComponent.element);
      for (let i = 1; i < tripPoints.length - 1; i++) {
        this.#renderTripPoint(tripPoints[i]);
      }
    }
  }

  #renderTripPoint = (tripPoint) => {

    const escKeyDownHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        replaceFormToPoint();
        document.body.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripPointComponent = new EventItemView({
      tripPoint,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.body.addEventListener('keydown', escKeyDownHandler);
      }});

    const editFormComponent = new EventEditPointView({
      tripPoint,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.body.removeEventListener('keydown', escKeyDownHandler);
      }});

    function replacePointToForm() {
      replace(editFormComponent, tripPointComponent);
    }

    function replaceFormToPoint() {
      replace(tripPointComponent, editFormComponent);
    }

    render(tripPointComponent, this.#tripListComponent.element);
  };
}
