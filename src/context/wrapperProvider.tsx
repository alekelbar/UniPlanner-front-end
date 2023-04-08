import { Theme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { GreenTheme } from "../config/MUI/theme";
import { ThemeContext } from "@emotion/react";

export function ThemeProviderWrapper (props: { children: React.ReactNode; }) {
  const { children } = props;
  const [appTheme, setAppTheme] = useState<Theme>(GreenTheme);

  const onChangeTheme = (theme: Theme) => {
    setAppTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ onChangeTheme }}>
      <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}