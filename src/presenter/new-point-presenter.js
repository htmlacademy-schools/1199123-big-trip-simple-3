import {remove, render, RenderPosition} from '../framework/render';
import { UPDATE_TYPE, USER_ACTION } from '../utils/const';
import EditFormView from '../view/trip-edit-form-view';


export default class NewPointPresenter {
  #handleChange;
  #handleDestroy;
  #tripPointsListContainer;
  #tripPointsFormComponent;


  constructor({tripEventsListContainer, onDataChange, onDestroy}) {
    this.#tripPointsListContainer = tripEventsListContainer;
    this.#handleChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init = ({destinations, offers}) => {
    if (this.#tripPointsFormComponent !== undefined) {
      return;
    }

    this.#tripPointsFormComponent = new EditFormView({
      destinations,
      offers,
      onFormSubmit: this.#onSubmit,
      onDeleteClick: this.#onDeleteClick,
      onRollUpButton: this.#onDeleteClick,
      isEditForm: false
    });

    render(this.#tripPointsFormComponent, this.#tripPointsListContainer,
      RenderPosition.AFTERBEGIN);

    document.body.addEventListener('keydown', this.#escapeKeyHandler);
  };

  destroy() {
    if (this.#tripPointsFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#tripPointsFormComponent);
    this.#tripPointsFormComponent = null;

    document.body.removeEventListener('keydown', this.#escapeKeyHandler);
  }

  #onSubmit = (tripEvent) => {
    this.#handleChange(
      USER_ACTION.ADD_TRIPPOINT,
      UPDATE_TYPE.MINOR,
      this.#deleteId(tripEvent)
    );
    this.destroy();
  };

  #onDeleteClick = () => {
    this.destroy();
  };

  setSaving() {
    this.#tripPointsFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#tripPointsFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#tripPointsFormComponent.shake(resetFormState);
  }

  #escapeKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #deleteId = (tripEvent) => {
    delete tripEvent.id;
    return tripEvent;
  };
}
