import { RESPONSES } from "../../interfaces/response-messages";
import { CareerService } from "../../services";
import {
  addCareer,
  removeCareer,
  setCareers,
  StartLoadingCareer,
  StopLoadingCareer,
} from "../slices/Career/careerSlice";
import { AppDispatch, RootState } from "../store";

export const startLoadCareers = (id: string) => {
  return async (dispatch: AppDispatch) => {
    // cargando las carreras...
    dispatch(StartLoadingCareer());
    
    const service = new CareerService();
    const careers = await service.getCareers(id);
    
    if (typeof careers === "string") {
      dispatch(StopLoadingCareer());
      return RESPONSES.UNAUTHORIZE;
    }

    dispatch(setCareers(careers));
    dispatch(StopLoadingCareer());
    return RESPONSES.SUCCESS;
  };
};

export const startAddCareer = (idCareer: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // agregando una carrera
    dispatch(StartLoadingCareer());
    const {
      auth: { user },
    } = getState();

    if (!user) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = new CareerService();
    const response = await service.addCareer(user.id, idCareer);

    if (typeof response === "string") {
      dispatch(StopLoadingCareer());
      return RESPONSES.NOT_FOUND;
    }

    dispatch(addCareer(response));
    dispatch(StopLoadingCareer());
    return RESPONSES.SUCCESS;
  };
};

export const startRemoveCareer = (idCareer: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // agregando una carrera
    dispatch(StartLoadingCareer());
    const {
      auth: { user },
    } = getState();

    if (!user) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = new CareerService();
    const response = await service.removeCareer(user.id, idCareer);

    if (typeof response === "string") {
      dispatch(StopLoadingCareer());
      return response;
    }

    dispatch(removeCareer(response));
    dispatch(StopLoadingCareer());
    return RESPONSES.SUCCESS;
  };
};
