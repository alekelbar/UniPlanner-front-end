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
      main: "#d32f2f", // Rojo Pantone 185
    },
    secondary: {
      main: "#757575", // Gris Pantone Cool Gray 6
    },
    background: {
      default: "#222", // Fondo oscuro
      paper: "#333", // Fondo oscuro más claro para componentes
    },
    text: {
      primary: "#fff", // Texto blanco
      secondary: "#aaa", // Texto gris claro
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
