import { setLocalToken } from "../../helpers/local-storage";
import { RESPONSES } from "../../interfaces/response-messages";
import { UserLogin, UserRegister } from "../../interfaces/users.interface";
import { SettingService } from "../../services/Settings/settings-services";
import { UserService } from "../../services/User/user-service";
import { UpdateUser } from "../../types/users/update-user";
import { updateSetting } from "../slices/Settings/setting-slice";
import {
  initLoadingApp,
  onUpdateUser,
  setAuth,
  stopLoadingApp,
} from "../slices/auth/authSlice";
import { AppDispatch, RootState } from "../store";

export const startUserLogin = (login: UserLogin) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(initLoadingApp());

    const service = new UserService();
    const logIn = await service.login(login);

    if (typeof logIn === "string") {
      dispatch(stopLoadingApp());
      return logIn;
    }

    const { loading, token, user } = logIn;

    dispatch(setAuth({ loading, token, user }));

    setLocalToken(logIn, "token");

    // Cargar las preferencias de usuario...
    const userId = getState().auth.user?.id;

    const settingsService = new SettingService();
    const settings = await settingsService.getSetting(userId as string);

    if (typeof settings === "string") {
      dispatch(stopLoadingApp());
      return settings;
    }

    dispatch(updateSetting(settings));
    dispatch(stopLoadingApp());
    return RESPONSES.SUCCESS;
  };
};

export const startUserRegister = (register: UserRegister) => {
  return async (dispatch: AppDispatch) => {
    dispatch(initLoadingApp());
    const service = new UserService();

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

    const service = new UserService();
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
