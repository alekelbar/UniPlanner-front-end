import { Fab } from '@mui/material';
import { Box, SxProps } from '@mui/system';

interface AddFloatButtonProps {
  onAction: () => void;
  icon: JSX.Element,
  sxProps: SxProps;
}

export function FloatButton ({ onAction, icon, sxProps }: AddFloatButtonProps): JSX.Element {
  // { position: 'fixed', bottom: 16, right: 16; }
  return (
    <Box sx={{
      ...sxProps
    }}>
      <Fab onClick={onAction} sx={{
        width: { md: '6em' },
        height: { md: '6em' },
        cursor: 'pointer',
        transition: 'all 0.3s',
        '&:hover': {
          backgroundColor: theme => theme.palette.primary.main,
        },
      }}>
        {icon}
      </Fab>
    </Box>
  );
}