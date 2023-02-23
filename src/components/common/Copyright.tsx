import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { Box } from '@mui/system';

export default function Copyright () {
  return (
    <Box component={'div'} sx={{ position: 'absolute', bottom: '2%', left: '2%' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://www.instagram.com/alekelbar/" target={'_blank'}>
          alekelbar
        </MuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}
