import { render, remove, RenderPosition } from '../framework/render.js';
import EditFormView from '../view/event-edit-form-view.js';
import { isEscapeKey } from '../utils/item-utils.js';
import { UserAction, UpdateType } from '../utils/constant.js';
import { nanoid } from 'nanoid';


export default class NewTripPointPresenter {
  #handleDataChange = null;
  #handleDestroy = null;
  #tripPointListContainer = null;

  #tripPointEditComponent = null;

  constructor({tripPointListContainer, onDataChange, onDestroy}) {
    this.#tripPointListContainer = tripPointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(destinations, offers) {
    if (this.#tripPointEditComponent !== null) {
      return;
    }

    this.#tripPointEditComponent = new EditFormView({
      destinations: destinations,
      offers: offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      isEditForm: false
    });

    render(this.#tripPointEditComponent, this.#tripPointListContainer,
      RenderPosition.AFTERBEGIN);

    document.body.addEventListener('keydown', this.#ecsKeyDownHandler);
  }

  destroy() {
    if (this.#tripPointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#tripPointEditComponent);
    this.#tripPointEditComponent = null;

    document.body.removeEventListener('keydown', this.#ecsKeyDownHandler);
  }


  #ecsKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (tripPoint) => {
    this.#handleDataChange(
      UserAction.ADD_TRIPPOINT,
      UpdateType.MINOR,

      {id: nanoid(), ...tripPoint}
    );

    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
