import { UserLogin } from "../../services/API";
import { AppDispatch, RootState } from "../store.redux";
import { UserService } from "../../services/API/User/user.service";
import { setAuth } from "../slices/auth/authSlice";
import { UserRegister } from "../../services/API/User/users.models";
import { setLocalToken } from "../../helpers/local-storage";
import { RESPONSES } from "../../helpers/interfaces/response-messages";
import {
  setCareers,
  setErrors,
  setLoading,
} from "../slices/Career/careerSlice";

const service = UserService.createService("v1");

export const startUserLogin = (login: UserLogin) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { error, token, user } = await service.login(login);

    console.log(error, token, user);
    if (error) {
      return error;
    }

    dispatch(setAuth({ error: null, token, user }));
    setLocalToken({ error: null, token, user });

    return RESPONSES.SUCCESS;
  };
};

export const startUserRegister = (register: UserRegister) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { error, token, user } = await service.register(register);

    if (error) {
      return error;
    }

    dispatch(setAuth({ error: null, token, user }));
    setLocalToken({ error: null, token, user });
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
      dispatch(setErrors("No existe ningun usuario autenticado"));
      return RESPONSES.ERROR;
    }

    const careers = await service.getCareers(user.identification);
    dispatch(setCareers(careers));

    dispatch(setLoading());
    return RESPONSES.SUCCESS;
  };
};
