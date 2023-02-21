import { SchoolOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { SmallLogo } from '../../SmallLogo';

interface NabvarProps {
  onOpen: () => void;
}

export const Navbar: React.FC<NabvarProps> = ({ onOpen }) => {
  return (
    <AppBar position='static'>
      <Toolbar variant='regular'>
        <IconButton size='large' onClick={() => onOpen()} edge="start" color="inherit" aria-label="menu"
          sx={{ mr: 2, color: ({ palette }) => palette.secondary.dark }}
        >
          <SmallLogo />
        </IconButton>
        <Typography variant="button" color="inherit">
          Gestión de entregables
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
