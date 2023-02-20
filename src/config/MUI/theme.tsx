import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import NextLink, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

const LinkBehavior = forwardRef<HTMLAnchorElement, LinkProps>(function LinkBehavior (props, ref) {
  return <NextLink {...props} passHref ref={ref} />;
});

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
});

export default theme;
