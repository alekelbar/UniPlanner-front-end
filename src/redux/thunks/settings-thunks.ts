import { RESPONSES } from "../../interfaces/response-messages";
import { Setting } from "../../interfaces/settings-interfaces";
import { SettingService } from "../../services/Settings/settings-services";
import {
  setLoadingSettings,
  stopLoadingSettings,
  updateSetting,
} from "../slices/Settings/setting-slice";
import { AppDispatch, RootState } from "../store";

export const startLoadSetting = (userId: string) => {
  return async (dispatch: AppDispatch) => {
    // cargando las carreras...
    dispatch(setLoadingSettings());

    const service = new SettingService();
    const response = await service.getSetting(userId);

    if (response.status !== 200) {
      dispatch(stopLoadingSettings());
      return response;
    }

    const { data } = response;
    dispatch(updateSetting(data));
    dispatch(stopLoadingSettings());
    return RESPONSES.SUCCESS;
  };
};

export const startUpdateSetting = (settingUpdate: Setting) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando las carreras...
    dispatch(setLoadingSettings());

    const {
      auth: { user },
    } = getState();

    if (!user) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = new SettingService();
    const response = await service.updateSetting(settingUpdate);

    if (response.status !== 200) {
      dispatch(stopLoadingSettings());
      return response;
    }

    const { data } = response;
    dispatch(updateSetting(data));
    dispatch(stopLoadingSettings());
    return RESPONSES.SUCCESS;
  };
};
