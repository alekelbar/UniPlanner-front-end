import { Deliverable } from "../../interfaces/deliveries.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { DeliverableService } from "../../services/Deliveries/Deliverable-service";
import {
  addDelivery,
  loadDeliveries,
  removeDelivery,
  startLoadingDeliveries,
  stopLoadingDeliveries,
  updateDeliverable
} from "../slices/Deliveries/deliveriesSlice";
import { AppDispatch, RootState } from "../store";

export const startLoadDeliveries = (page: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando LOS CURSOS...
    dispatch(startLoadingDeliveries());

    const {
      auth: { user },
      courses: { selected: selectedCourse },
    } = getState();

    if (!user || !selectedCourse) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = new DeliverableService();
    const response = await service.getDeliverables(selectedCourse, page);

    if (typeof response === "string") {
      dispatch(stopLoadingDeliveries());
      return response;
    }

    const data = response.data;
    dispatch(loadDeliveries(data));
    dispatch(stopLoadingDeliveries());
    return RESPONSES.SUCCESS;
  };
};

export const startcreateDelivery = (deliverable: Deliverable) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando LOS CURSOS...
    // dispatch(startLoadingDeliveries());

    const {
      auth: { user },
      courses: { selected: selectedCourse },
    } = getState();

    if (!user || !selectedCourse) {
      return RESPONSES.UNAUTHORIZE;
    }

    deliverable.course = selectedCourse._id;

    const service = new DeliverableService();
    const response = await service.createDeliverables(deliverable);

    if (typeof response === "string") {
      // dispatch(stopLoadingDeliveries());
      return response;
    }
    const deliverie = response.data;
    dispatch(addDelivery(deliverie));
    // dispatch(stopLoadingDeliveries());
    return RESPONSES.SUCCESS;
  };
};

export const startRemoveDelivery = (deliverable: Deliverable) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando LOS CURSOS...
    // dispatch(startLoadingDeliveries());

    const {
      auth: { user },
      courses: { selected: selectedCourse },
    } = getState();

    if (!user || !selectedCourse) {
      return RESPONSES.UNAUTHORIZE;
    }
    const service = new DeliverableService();
    const response = await service.removeDeliverables(deliverable);

    if (typeof response === "string") {
      // dispatch(stopLoadingDeliveries());
      return response;
    }

    const deliverie = response.data;
    dispatch(removeDelivery(deliverie));
    // dispatch(stopLoadingDeliveries());
    return RESPONSES.SUCCESS;
  };
};

export const startUpdateDelivery = (deliverable: Deliverable) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando LOS CURSOS...
    // dispatch(startLoadingDeliveries());

    const {
      auth: { user },
      courses: { selected: selectedCourse },
      deliveries: { selected: selectedDeliveries },
    } = getState();

    if (!user || !selectedCourse || !selectedDeliveries) {
      return RESPONSES.UNAUTHORIZE;
    }

    deliverable._id = selectedDeliveries._id;

    const service = new DeliverableService();
    const response = await service.updateDeliverable(deliverable);

    if (typeof response === "string") {
      // dispatch(stopLoadingDeliveries());
      return response;
    }

    const deliverie = response.data;
    dispatch(updateDeliverable(deliverie));
    // dispatch(stopLoadingDeliveries());
    return RESPONSES.SUCCESS;
  };
};
