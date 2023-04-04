import { Theme } from "@mui/material";
import { createContext } from "react";

export type ThemeContext = {
  onChangeTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContext>({
  onChangeTheme: (theme: Theme) => {},
});
