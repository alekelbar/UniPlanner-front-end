export interface CreateSetting {
  importance: number;
  urgency: number;
  do: string;
  prepare: string;
  delegate: string;
  ignore: string;
  user: string;
}

export interface Setting {
  user: string;
  _id?: string;
  importance: number;
  urgency: number;
  do: string;
  prepare: string;
  delegate: string;
  ignore: string;
}

export interface SettingState {
  loading: boolean;
  error: string | null;
  selected: Setting;
}
