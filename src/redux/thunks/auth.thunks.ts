import { UserLogin } from "../../services/API";
import { AppDispatch, RootState } from "../store.redux";
import { UserService } from "../../services/API/User/user.service";
import { cleanErrors, setAuth } from "../slices/auth/authSlice";
import { UserRegister } from "../../services/API/User/users.models";
import Swal from "sweetalert2";
import { setLocalToken } from "../../helpers/local-storage";

const service = UserService.createService("v1");

export const startUserLogin = (user: UserLogin) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await service.login(user);
    dispatch(setAuth(response));

    console.log(response);

    if (response.error) {
      Swal.fire(response.error);
      dispatch(cleanErrors);
    }
    setLocalToken(response);
  };
};

export const startRegisterUser = (user: UserRegister) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await service.register(user);
    dispatch(setAuth(response));

    if (response.error) {
      Swal.fire(response.error);
      dispatch(cleanErrors);
    }
    setLocalToken(response);
  };
};
