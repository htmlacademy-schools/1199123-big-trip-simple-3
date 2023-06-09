import { render } from '../render';
import EventListSortView from '../view/event-list-sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventItemView from '../view/event-item-view';
import EventEditPointView from '../view/event-edit-point-view.js';
import NewItemFormView from '../view/event-create-form-view.js';

export default class EventPresenter {
  tripListComponent = new EventListView();

  constructor(tripPointsModel) {
    this.tripPointsModel = tripPointsModel;
  }

  init(container) {
    this.tripPoints = [...this.tripPointsModel.getTripPoints()];
    this.container = container;

    render(new EventListSortView(), this.container);
    render(this.tripListComponent, this.container);
    render(new NewItemFormView({tripPoint: this.tripPoints[0]}), this.tripListComponent.getElement());
    render(new EventEditPointView(), this.tripListComponent.getElement());
    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new EventItemView({tripPoint: this.tripPoints[i]}), this.tripListComponent.getElement());
    }
  }
}
