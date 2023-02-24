import { School } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Link from '../Link';

interface NabvarProps {
  onOpen: () => void;
}

export function Navbar ({ onOpen }: NabvarProps): JSX.Element {

  return (
    <AppBar position='static'>
      <Toolbar variant='regular'>
        <IconButton size='large' onClick={onOpen} edge="start" color="inherit" aria-label="menu"
          sx={{ mr: 2 }}
        >
          <School />
        </IconButton>
        <Typography variant="button" color="inherit">
          <Link href={'/home/careers'} sx={{ color: 'text.primary' }}>
            Gestión de entregables
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}