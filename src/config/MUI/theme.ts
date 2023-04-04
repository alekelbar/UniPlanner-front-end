import { amber, blueGrey, grey, yellow } from "@mui/material/colors";
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
        // Name of the slot
        root: {
          // Some CSS
          textTransform: "none",
        },
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
        },
        fab: {
          // Some CSS
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
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

// Create a theme instance.
export const redTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff8f75",
    },
    secondary: {
      main: "#cfcfcf",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cfcfcf",
    },
    background: {
      default: "#1a1a1a",
      paper: "#333333",
    },
  },
  typography: {
    fontFamily: [roboto.style.fontFamily].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: "none",
        },
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
        },
        fab: {
          // Some CSS
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
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

export const GreenTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00c4b4",
    },
    secondary: {
      main: "#cfcfcf",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cfcfcf",
    },
    background: {
      default: "#1a1a1a",
      paper: "#333333",
    },
  },
  typography: {
    fontFamily: [roboto.style.fontFamily].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: "none",
        },
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
        },
        fab: {
          // Some CSS
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
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

export const blueTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7cc6fe",
    },
    secondary: {
      main: "#cfcfcf",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cfcfcf",
    },
    background: {
      default: "#1a1a1a",
      paper: "#333333",
    },
  },
  typography: {
    fontFamily: [roboto.style.fontFamily].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: "none",
        },
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
        },
        fab: {
          // Some CSS
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
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
