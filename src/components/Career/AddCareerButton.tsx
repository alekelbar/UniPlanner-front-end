import { Box } from '@mui/system';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';

interface AddCareerButtonProps {
  onAdd: () => void;
}

export const AddCareerButton: React.FC<AddCareerButtonProps> = ({ onAdd }) => (
  <Box>
    <SpeedDial
      sx={{ position: 'absolute', bottom: 16, right: 10 }}
      ariaLabel="Agregar carrera"
      icon={<Edit />}
      FabProps={{ sx: { width: { sm: '.4em' }, height: { sm: '80px' } } }}
    >
      <SpeedDialAction
        icon={<Add sx={{ bgcolor: 'primary' }} />}
        sx={{ mb: { md: '1em' }, fontSize: '1em', bgcolor: ({ palette }) => palette.primary.main }}
        tooltipTitle={'Agregar una carrera'}
        onClick={onAdd}
      />
    </SpeedDial>
  </Box>
);