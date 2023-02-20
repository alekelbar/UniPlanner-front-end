import { AppDispatch, RootState } from "../store.redux";
import { CareerService } from "../../services/API/Career/career.service";
import { setCareers } from "../slices/Career/careerSlice";

export const startLoadCareers = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const service = CareerService.createService("v1");

    const { data } = await service.listAll();
    //update state...
    dispatch(setCareers(data));
  };
};
