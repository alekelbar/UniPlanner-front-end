import { setLocalToken } from "../../helpers/local-storage";
import { RESPONSES } from "../../interfaces/response-messages";
import { UserLogin, UserRegister } from "../../interfaces/users.interface";
import { UserService } from "../../services/User/user.service";
import { UpdateUser } from "../../types/users/update-user";
import { User } from "../../types/users/user";
import { onUpdateUser, setAuth } from "../slices/auth/authSlice";
import { AppDispatch, RootState } from "../store";

const service = UserService.createService("v1");

export const startUserLogin = (login: UserLogin) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    
    const registered = await service.login(login);

    if (registered.error) {
      return registered.error;
    }

    dispatch(setAuth({ ...registered, error: null }));
    setLocalToken({ ...registered, error: null }, "token");

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
    setLocalToken({ ...registered, error: null }, "token");

    return RESPONSES.SUCCESS;
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
      setLocalToken(getState().auth, "token");
      return RESPONSES.SUCCESS;
    }
    return response;
  };
};
