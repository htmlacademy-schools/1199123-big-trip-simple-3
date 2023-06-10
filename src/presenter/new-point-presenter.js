import {render, RenderPosition} from '../render';
import { UpdateType, UserAction } from '../utils/filters-and-sorts';

import EditForm from '../view/trip-edit-form-view';
import {remove} from '../framework/render';
import { isEscapeKey } from '../utils/item-utils';


export default class NewWaypointPresenter {
  #handleDataChange = null;
  #handleDestroy = null;
  #waypointListContainer = null;
  #waypointEditComponent = null;

  constructor({waypointListContainer, onDataChange, onDestroy}) {
    this.#waypointListContainer = waypointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(destinations, offers) {
    if (this.#waypointEditComponent !== null) {
      return;
    }

    this.#waypointEditComponent = new EditForm({
      destinations: destinations,
      offers: offers,
      onSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      isEditForm: false
    });

    render(this.#waypointEditComponent, this.#waypointListContainer,
      RenderPosition.AFTERBEGIN);

    document.body.addEventListener('keydown', this.#ecsKeyDownHandler);
  }

  setSaving() {
    this.#waypointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#waypointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#waypointEditComponent.shake(resetFormState);
  }

  destroy() {
    if (this.#waypointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#waypointEditComponent);
    this.#waypointEditComponent = null;

    document.body.removeEventListener('keydown', this.#ecsKeyDownHandler);
  }


  #ecsKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (waypoint) => {
    this.#handleDataChange(
      UserAction.ADD_WAYPOINT,
      UpdateType.MINOR,

      this.#deleteId(waypoint)
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #deleteId = (waypoint) => {
    delete waypoint.id;
    return waypoint;
  };

}
