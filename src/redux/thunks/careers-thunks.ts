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
    const response = await service.getCareers(id);

    const { data } = response;
    if (response.status !== 200) {
      dispatch(StopLoadingCareer());
      return data.message;
    }

    dispatch(setCareers(data));
    dispatch(StopLoadingCareer());
    return RESPONSES.SUCCESS;
  };
};

export const startAddCareer = (careerId: string, userId: string) => {
  return async (dispatch: AppDispatch) => {
    // agregando una carrera
    dispatch(StartLoadingCareer());

    const service = new CareerService();
    const response = await service.addCareer(careerId, userId);

    const { data } = response;
    if (response.status !== 201) {
      dispatch(StopLoadingCareer());
      return data.message;
    }

    dispatch(addCareer(data));
    dispatch(StopLoadingCareer());
    return RESPONSES.SUCCESS;
  };
};

export const startRemoveCareer = (careerId: string, userId: string) => {
  return async (dispatch: AppDispatch) => {
    // agregando una carrera
    dispatch(StartLoadingCareer());

    const service = new CareerService();
    const response = await service.removeCareer(careerId, userId);

    const { data } = response;
    if (response.status !== 200) {
      dispatch(StopLoadingCareer());
      return data.message;
    }

    dispatch(removeCareer(data));
    dispatch(StopLoadingCareer());
    return RESPONSES.SUCCESS;
  };
};
