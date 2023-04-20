import { Menu } from '@mui/icons-material';
import { AppBar, Button, Stack, Typography } from '@mui/material';

interface NabvarProps {
  onOpen: () => void;
}

export function Navbar ({ onOpen }: NabvarProps): JSX.Element {

  return (
    <AppBar position='static' sx={{ p: 2 }}>
      <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} gap={1.5}>
        <Button
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
          onClick={onOpen}
        >
          <Menu sx={{ fontSize: '2em' }} />
        </Button>
        <Typography variant="h4">
          UniPlanner
        </Typography>
      </Stack>
    </AppBar>
  );
}