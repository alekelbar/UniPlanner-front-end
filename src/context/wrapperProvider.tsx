import { ThemeContext } from "@emotion/react";
import { Theme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { UNATheme } from "../config/MUI/theme";

export function ThemeProviderWrapper (props: { children: React.ReactNode; }) {
  const { children } = props;
  const [appTheme, setAppTheme] = useState<Theme>(UNATheme);

  const onChangeTheme = (theme: Theme) => {
    setAppTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ onChangeTheme }}>
      <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}