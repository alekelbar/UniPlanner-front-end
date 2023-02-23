import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { Box } from '@mui/system';

export default function Copyright () {
  return (
    <Box component={'div'} sx={{ position: 'sticky', zIndex: '10', my: 2 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://linktr.ee/alekelbar" target={'_blank'}>
          alekelbar
        </MuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}
