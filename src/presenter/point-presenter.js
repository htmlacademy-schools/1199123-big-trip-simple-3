import {remove, render, replace} from '../framework/render.js';
import { isEscapeKey } from '../utils/item-utils.js';
import EventItemView from '../view/event-item-view.js';
import EditFormView from '../view/event-edit-form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPointPresenter {
  #handleModeChange = null;
  #handleDataChange = null;

  #tripPointList = null;
  #editFormComponent = null;
  #tripPointComponent = null;

  #tripPoint = null;
  #destinations = null;
  #offers = null;
  #mode = Mode.DEFAULT;

  constructor({tripPointList, onModeChange, onDataChange}) {
    this.#tripPointList = tripPointList;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(tripPoint, destinations, offers) {
    this.#tripPoint = tripPoint;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevTripPointComponent = this.#tripPointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#tripPointComponent = new EventItemView({
      tripPoint: this.#tripPoint,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleEditClick
    });

    this.#editFormComponent = new EditFormView({
      tripPoint: this.#tripPoint,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onRollUpButton: this.#handleRollUpButtonClick
    });

    if (prevTripPointComponent === null || prevEditFormComponent === null) {
      render(this.#tripPointComponent, this.#tripPointList);
      return;
    }

    switch (this.#mode) {
      case Mode.DEFAULT:
        replace(this.#tripPointComponent, prevTripPointComponent);
        break;
      case Mode.EDITING:
        replace(this.#editFormComponent, prevEditFormComponent);
    }

    remove(prevEditFormComponent);
    remove(prevTripPointComponent);
  }

  destroy() {
    remove(this.#tripPointComponent);
    remove(this.#editFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editFormComponent.reset(this.#tripPoint);
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm = () => {
    replace(this.#editFormComponent, this.#tripPointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#tripPointComponent, this.#editFormComponent);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#editFormComponent.reset(this.#tripPoint);
      this.#replaceFormToPoint();
      document.body.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
    document.body.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (tripPoint) => {
    this.#handleDataChange(tripPoint);
    this.#replaceFormToPoint();
    document.body.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleRollUpButtonClick = () => {
    this.#editFormComponent.reset(this.#tripPoint);
    this.#replaceFormToPoint();
    document.body.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
