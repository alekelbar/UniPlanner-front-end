import { createTheme } from "@mui/material/styles";
import { Roboto } from "@next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const UNATheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ADB5",
    },
    secondary: {
      main: "#393E46",
    },
    text: {
      primary: "#fff",
      secondary: "#AAA",
    },
  },
  typography: {
    fontFamily: [roboto.style.fontFamily].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        root: {},
        fab: {},
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Roboto",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& input": {
            autoComplete: "off",
          },
        },
      },
    },
  },
});

export default UNATheme;
