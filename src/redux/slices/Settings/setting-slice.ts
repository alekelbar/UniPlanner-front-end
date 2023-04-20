import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Setting, SettingState } from "../../../interfaces/settings-interfaces";

const initialState: SettingState = {
  error: null,
  loading: false,
  selected: {
    delegate: "#ffffff",
    do: "#ffffff",
    ignore: "#ffffff",
    importance: 0,
    prepare: "#ffffff",
    urgency: 0,
    user: "",
  },
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setLoadingSettings: (state) => {
      state.loading = true;
    },
    stopLoadingSettings: (state) => {
      state.loading = false;
    },
    updateSetting: (state, { payload }: PayloadAction<Setting>) => {
      state.selected = payload;
    },
  },
});

export const { setLoadingSettings, stopLoadingSettings, updateSetting } =
  settingSlice.actions;
