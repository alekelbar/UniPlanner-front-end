import { School } from '@mui/icons-material';
import { AppBar, Typography } from '@mui/material';

interface NabvarProps {
  onOpen: () => void;
}

export function Navbar ({ onOpen }: NabvarProps): JSX.Element {

  return (
    <AppBar position='static' sx={{ p: 2 }}>
      <Typography
        variant="h4"
        sx={{
          cursor: 'pointer',
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
        onClick={onOpen}
        m='0 auto'>
        <School sx={{ fontSize: '.8em' }} />
        UniPlanner
      </Typography>
    </AppBar>
  );
}