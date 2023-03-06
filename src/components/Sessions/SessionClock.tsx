import { Timelapse, Timer } from '@mui/icons-material';
import { Backdrop, Button, Grid, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import Image from 'next/image';
import React, { useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function SessionClock () {
  const [open, setOpen] = useState(true);
  const percentage = 66;

  const theme = useTheme();

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Stack width={"300px"} height={"300px"}>
        <CircularProgressbarWithChildren value={66} styles={buildStyles({
          rotation: 0.5 + (1 - percentage / 100) / 2
        })}
        >
          <Typography variant='h2'>| Timer |</Typography>

          <Typography variant='h5'>- {percentage}% -</Typography>

        </CircularProgressbarWithChildren>
        <Grid container width={"90%"} sx={{ placeItems: "center" }} gap={2} m={'0 auto'} p={2} direction="column">
          <Button fullWidth onClick={() => { setOpen(false); }} variant="contained">
            Terminar
          </Button>
          <Button fullWidth color='success' variant='contained'>
            Pausar
          </Button>
        </Grid>
      </Stack>
    </Backdrop>
  );
}
