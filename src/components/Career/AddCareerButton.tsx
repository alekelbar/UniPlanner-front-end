import { Add } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { Box } from '@mui/system';

interface AddCareerButtonProps {
  onAdd: () => void;
}

export function AddCareerButton ({ onAdd }: AddCareerButtonProps): JSX.Element {
  return (
    <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
      <Fab onClick={onAdd} sx={{ width: { md: '6em' }, height: { md: '6em' } }}>
        <Add sx={{ fontSize: { md: '2.5em' } }} />
      </Fab>
    </Box>
  );
}