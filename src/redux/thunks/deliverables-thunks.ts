import { Deliverable } from "../../interfaces/deliveries.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { DeliverableService } from "../../services/Deliveries/Deliverable-service";
import {
  loadDeliveries,
  startLoadingDeliveries,
  stopLoadingDeliveries,
  addDelivery,
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

    const service = DeliverableService.createService("v1");
    const response = await service.getDeliverables(selectedCourse, page);

    if (typeof response !== "string") {
      const deliveries = response.data;
      dispatch(loadDeliveries(deliveries));
      dispatch(stopLoadingDeliveries());
      return RESPONSES.SUCCESS;
    }

    return response;
  };
};

export const startcreateDelivery = (deliverable: Deliverable) => {
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

    deliverable.course = selectedCourse._id;

    const service = DeliverableService.createService("v1");
    const response = await service.createDeliverables(deliverable);

    if (typeof response !== "string") {
      const deliverie = response.data;
      dispatch(addDelivery(deliverie));
      dispatch(stopLoadingDeliveries());
      return RESPONSES.SUCCESS;
    }

    return response;
  };
};
