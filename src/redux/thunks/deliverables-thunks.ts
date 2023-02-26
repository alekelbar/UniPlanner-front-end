import { RESPONSES } from "../../interfaces/response-messages";
import { DeliverableService } from "../../services/Deliveries/Deliverable-service";
import {
  loadDeliveries,
  startLoadingDeliveries,
  stopLoadingDeliveries,
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
