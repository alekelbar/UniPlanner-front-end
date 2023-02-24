import { School } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';

interface NabvarProps {
  onOpen: () => void;
}

export const Navbar: React.FC<NabvarProps> = ({ onOpen }) => {

  return (
    <AppBar position='static'>
      <Toolbar variant='regular'>
        <IconButton size='large' onClick={onOpen} edge="start" color="inherit" aria-label="menu"
          sx={{ mr: 2 }}
        >
          <School />
        </IconButton>
        <Typography variant="button" color="inherit">
          Gestión de entregables
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
