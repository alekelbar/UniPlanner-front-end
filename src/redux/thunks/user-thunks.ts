import { setLocalToken } from "../../helpers/local-storage";
import { RESPONSES } from "../../interfaces/response-messages";
import { UserLogin, UserRegister } from "../../interfaces/users.interface";
import { UserService } from "../../services/User/user-service";
import { UpdateUser } from "../../types/users/update-user";
import {
  initLoadingApp,
  onUpdateUser,
  setAuth,
  stopLoadingApp,
} from "../slices/auth/authSlice";
import { AppDispatch, RootState } from "../store";

// TODO Acabar de estandarizar este servicio, y este thunk

const service = UserService.createService();

export const startUserLogin = (login: UserLogin) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(initLoadingApp());

    const logIn = await service.login(login);

    if (typeof logIn === "string") {
      dispatch(stopLoadingApp());
      return logIn;
    }

    dispatch(setAuth(logIn));
    setLocalToken(logIn, "token");
    dispatch(stopLoadingApp());
    return RESPONSES.SUCCESS;
  };
};

export const startUserRegister = (register: UserRegister) => {
  return async (dispatch: AppDispatch) => {
    dispatch(initLoadingApp());
    const registered = await service.register(register);

    if (typeof registered === "string") {
      dispatch(stopLoadingApp());
      return registered;
    }

    dispatch(setAuth(registered));
    setLocalToken(registered, "token");
    dispatch(stopLoadingApp());
    return RESPONSES.SUCCESS;
  };
};

export const startUpdateUser = (updateUser: UpdateUser) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(initLoadingApp());
    const {
      auth: { user },
    } = getState();

    if (!user) {
      dispatch(stopLoadingApp());
      return RESPONSES.UNAUTHORIZE;
    }

    const service = UserService.createService();
    const response = await service.updateUser(updateUser, user.id);

    if (typeof response === "string") {
      dispatch(stopLoadingApp());
      return response;
    }

    const { email, fullname, identification, _id } = response;

    dispatch(onUpdateUser({ email, fullname, identification, id: _id }));
    setLocalToken(getState().auth, "token");
    dispatch(stopLoadingApp());

    return RESPONSES.SUCCESS;
  };
};
