import { Deliverable } from "../../interfaces/deliveries.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { DeliverableService } from "../../services/Deliveries/Deliverable-service";
import {
  addDelivery,
  loadDeliveries,
  removeDelivery,
  startLoadingDeliveries,
  stopLoadingDeliveries,
  updateDeliverable,
} from "../slices/Deliveries/deliveriesSlice";
import { AppDispatch, RootState } from "../store";

export const startLoadDeliveries = (courseId: string, page: number) => {
  return async (dispatch: AppDispatch) => {
    // cargando LOS CURSOS...
    dispatch(startLoadingDeliveries());

    const service = new DeliverableService();
    const response = await service.getDeliverables(courseId, page);

    if (response.status !== 200) {
      dispatch(stopLoadingDeliveries());
      return response;
    }

    const { data } = response;
    dispatch(loadDeliveries(data));
    dispatch(stopLoadingDeliveries());
    return RESPONSES.SUCCESS;
  };
};

export const startcreateDelivery = (deliverable: Deliverable) => {
  return async (dispatch: AppDispatch) => {
    // cargando LOS CURSOS...
    dispatch(startLoadingDeliveries());

    const service = new DeliverableService();
    const response = await service.createDeliverables(deliverable);

    if (response.status === 200) {
      dispatch(stopLoadingDeliveries());
      return response;
    }
    const { data } = response;
    dispatch(addDelivery(data));
    dispatch(stopLoadingDeliveries());
    return RESPONSES.SUCCESS;
  };
};

export const startRemoveDelivery = (deliverable: Deliverable) => {
  return async (dispatch: AppDispatch) => {
    // cargando LOS CURSOS...
    dispatch(startLoadingDeliveries());

    const service = new DeliverableService();
    const response = await service.removeDeliverables(deliverable);

    if (response.status !== 200) {
      dispatch(stopLoadingDeliveries());
      return response;
    }

    const { data } = response;
    console.log(data);
    dispatch(removeDelivery(data));
    dispatch(stopLoadingDeliveries());
    return RESPONSES.SUCCESS;
  };
};

export const startUpdateDelivery = (deliverable: Deliverable) => {
  return async (dispatch: AppDispatch) => {
    // cargando LOS CURSOS...
    dispatch(startLoadingDeliveries());

    const service = new DeliverableService();
    const response = await service.updateDeliverable(deliverable);

    if (response.status !== 200) {
      dispatch(stopLoadingDeliveries());
      return response;
    }

    const { data } = response;
    dispatch(updateDeliverable(data));
    dispatch(stopLoadingDeliveries());
    return RESPONSES.SUCCESS;
  };
};
