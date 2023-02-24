import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a31e32',
      light: "#da535b",
      dark: "#6d000c",
    },
    secondary: {
      main: '#455a64',
      light: "#718792",
      dark: "#1c313a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff"
    }
  },
  typography: {
    fontFamily: [roboto.style.fontFamily].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none'
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
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
          fontFamily: 'Roboto'
        },
      },
    }
  },
});

export default theme;
