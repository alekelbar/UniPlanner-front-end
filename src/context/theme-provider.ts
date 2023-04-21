import { Theme } from "@mui/material";
import { createContext } from "react";

export type SwitchThemeContext = {
  onChangeTheme: (theme: Theme) => void;
};

export const OnChangeThemeContext = createContext<SwitchThemeContext>({
  onChangeTheme: (theme: Theme) => {},
});
