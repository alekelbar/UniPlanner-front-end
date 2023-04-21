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
  return async (dispatch: AppDispatch) => {
    dispatch(initLoadingApp());

    const service = new UserService();
    const logIn = await service.login(login);

    const { data } = logIn;
    console.log(logIn);

    if (logIn.status !== 201) {
      dispatch(stopLoadingApp());
      return logIn;
    }

    const { loading, token, user } = data;

    dispatch(setAuth({ loading, token, user }));

    setLocalToken(data, "token");

    // Cargar las preferencias de usuario...
    const settingsService = new SettingService();
    const response = await settingsService.getSetting(data.user.id as string);

    if (response.status !== 200) {
      dispatch(stopLoadingApp());
      return response;
    }

    const { data: settings } = response;
    dispatch(updateSetting(settings));
    dispatch(stopLoadingApp());
    return RESPONSES.SUCCESS;
  };
};

export const startUserRegister = (register: UserRegister) => {
  return async (dispatch: AppDispatch) => {
    dispatch(initLoadingApp());

    const service = new UserService();
    const settingsService = new SettingService();

    const registered = await service.register(register);
    const { data } = registered;

    if (registered.status !== 201) {
      dispatch(stopLoadingApp());
      return registered;
    }

    const response = await settingsService.createSetting({
      delegate: "#d3e1fd",
      do: "#d14d72",
      ignore: "#fcfde7",
      importance: 3,
      prepare: "#adffcd",
      urgency: 1,
      user: data.user.id,
    });

    if (response.status !== 201) {
      dispatch(stopLoadingApp());
      return response;
    }

    const { data: setting } = response;

    dispatch(updateSetting(setting));
    dispatch(setAuth(data));
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
