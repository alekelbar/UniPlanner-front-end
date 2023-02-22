import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#A31E32",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: '10px',
          padding: '5px 10px',
        },
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontWeight: 700,
          borderRadius: '10px',
          padding: '5px 10px',
        },
        fab: {
          // Some CSS
          fontSize: '20rem',
          fontWeight: 600,
          borderRadius: '10px',
          padding: '10px 20px',
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
          fontWeight: 400,
          borderRadius: '10px',
        },
      },
    }
  },
});

export default theme;
