import React from 'react';
import { Button, Link as MUILink, SxProps, Typography } from '@mui/material';
import NextLink from 'next/link';


interface LinkProps {
  href: string;
  children: React.ReactNode;
  linkSx: SxProps;
  buttonVariant: "text" | "outlined" | "contained" | undefined;
  buttonSx?: SxProps;
  fullWidth?: boolean;
}

export const Link: React.FC<LinkProps> = ({ children, href, linkSx, buttonSx, buttonVariant, fullWidth = false }) => {
  return (
    <MUILink sx={linkSx} component={NextLink} href={href}>
      <Button sx={buttonSx} fullWidth={fullWidth} variant={buttonVariant} color="primary">
        {children}
      </Button>
    </MUILink>
  );
};
