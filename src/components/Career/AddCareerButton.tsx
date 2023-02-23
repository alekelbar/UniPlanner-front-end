import { Box } from '@mui/system';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

interface AddCareerButtonProps {
  onAdd: () => void;
}

export const AddCareerButton: React.FC<AddCareerButtonProps> = ({ onAdd }) => (
  <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
    <Fab onClick={onAdd} sx={{ width: { md: '6em' }, height: { md: '6em' } }}>
      <Add sx={{ fontSize: { md: '2.5em' } }} />
    </Fab>
  </Box>
);