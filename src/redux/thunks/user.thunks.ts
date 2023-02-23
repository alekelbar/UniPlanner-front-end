import Career from "../../../pages/home/index";
import { RESPONSES } from "../../interfaces/response-messages";
import { setLocalToken } from "../../helpers/local-storage";
import { UserLogin, UserRegister } from "../../interfaces/users.interface";
import { UserService } from "../../services/User/user.service";
import { setAuth } from "../slices/auth/authSlice";
import { setCareers, setLoading } from "../slices/Career/careerSlice";
import { AppDispatch, RootState } from "../store";

const service = UserService.createService("v1");

export const startUserLogin = (login: UserLogin) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const registered = await service.login(login);

    if (registered.error) {
      return registered.error;
    }

    dispatch(setAuth({ ...registered, error: null }));
    setLocalToken({ ...registered, error: null });

    return RESPONSES.SUCCESS;
  };
};

export const startUserRegister = (register: UserRegister) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const registered = await service.register(register);

    if (registered.error) {
      return registered.error;
    }

    dispatch(setAuth({ ...registered, error: null }));
    setLocalToken({ ...registered, error: null });

    return RESPONSES.SUCCESS;
  };
};

export const startLoadCareers = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando las carreras...
    dispatch(setLoading());
    const {
      auth: { user },
    } = getState();

    if (!user) {
      return RESPONSES.UNAUTHORIZE;
    }

    const careers = await service.getCareers(user.identification);

    if (typeof careers !== "string") {
      dispatch(setCareers(careers as Career[]));
      dispatch(setLoading());
      return RESPONSES.SUCCESS;
    }

    return RESPONSES.UNAUTHORIZE;
  };
};

export const startAddCareer = (idCareer: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // agregando una carrera
    dispatch(setLoading());
    const {
      auth: { user },
    } = getState();

    if (!user) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = UserService.createService("v1");
    const response = service.addCareer(user.id, idCareer);

    if (typeof response !== "string") {
      dispatch(setLoading());
      return RESPONSES.SUCCESS;
    }

    return RESPONSES.NOT_FOUND;
  };
};
