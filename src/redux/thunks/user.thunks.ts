import Career from "../../../pages/home/index";
import { RESPONSES } from "../../interfaces/response-messages";
import { setLocalToken } from "../../helpers/local-storage";
import { UserLogin, UserRegister } from "../../interfaces/users.interface";
import { UserService } from "../../services/User/user.service";
import { onUpdateUser, setAuth } from "../slices/auth/authSlice";
import {
  addCareer,
  removeCareer,
  setCareers,
  setLoading,
} from "../slices/Career/careerSlice";
import { AppDispatch, RootState } from "../store";
import { UpdateUser } from "../../models/users/update-user";
import { User } from "../../models";

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
    const response = await service.addCareer(user.id, idCareer);

    if (typeof response !== "string") {
      dispatch(addCareer(response as Career));
      dispatch(setLoading());
      return RESPONSES.SUCCESS;
    }

    return RESPONSES.NOT_FOUND;
  };
};

export const startRemoveCareer = (idCareer: string) => {
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
    const response = await service.removeCareer(user.id, idCareer);

    if (typeof response !== "string") {
      dispatch(removeCareer(response as Career));
      dispatch(setLoading());
      return RESPONSES.SUCCESS;
    }

    return response;
  };
};

export const startUpdateUser = (updateUser: UpdateUser) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      auth: { user },
    } = getState();

    if (!user) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = UserService.createService("v1");
    const response = await service.updateUser(updateUser, user.id);

    if (typeof response !== "string") {
      const { email, fullname, identification, _id } = response as User;
      dispatch(onUpdateUser({ email, fullname, identification, id: _id }));
      setLocalToken(getState().auth);
      return RESPONSES.SUCCESS;
    }
    return response;
  };
};
