import {remove, render, replace} from '../framework/render.js';
import EventItemView from '../view/event-item-view.js';
import NewItemFormView from '../view/event-create-form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #container = null;
  #tripPoint = null;
  #tripPointFormComponent = null;
  #tripPointComponent = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor(container, tripPoint, {handleModeChange}) {
    this.#tripPoint = tripPoint;
    this.#container = container;
    this.#handleModeChange = handleModeChange;
  }

  #closeEditFormOnEcsKey(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#tripPointFormComponent, this.#tripPointComponent);
    document.addEventListener('keydown', this.#closeEditFormOnEcsKey);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#tripPointComponent, this.#tripPointFormComponent);
    document.removeEventListener('keydown', this.#closeEditFormOnEcsKey);
    this.#mode = Mode.DEFAULT;
  }


  init() {
    const prevTripPointComponent = this.#tripPointComponent;
    const prevTripPointFormComponent = this.#tripPointFormComponent;

    this.#tripPointFormComponent = new NewItemFormView({
      tripPoint: this.#tripPoint
    });

    this.#tripPointComponent = new EventItemView({
      tripPoint: this.#tripPoint
    });

    this.#tripPointComponent.querySelector('.event__rollup-btn').addEventListener('click', () => {
      this.#replacePointToForm();
    });

    this.#tripPointFormComponent.querySelector('.event__save-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#replaceFormToPoint();
    });

    this.#tripPointFormComponent.querySelector('.event__reset-btn').addEventListener('click', () => {
      this.#replaceFormToPoint();
    });

    if (prevTripPointComponent === null || prevTripPointFormComponent === null) {
      render(this.#tripPointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripPointFormComponent, prevTripPointFormComponent);
    }

    remove(prevTripPointComponent);
    remove(prevTripPointFormComponent);
  }

  destroy() {
    remove(this.#tripPointComponent);
    remove(this.#tripPointFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }
}
