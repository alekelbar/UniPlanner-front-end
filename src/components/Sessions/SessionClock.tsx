import { Backdrop, Button, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { setInterval, clearInterval } from 'timers';
import { useAppSelector } from '../../redux';

interface SessionClockProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export default function SessionClock ({ open, onClose }: SessionClockProps): JSX.Element {

  const { selected } = useAppSelector(st => st.sessions);

  const secondsLeftRef = useRef(0);
  const pauseRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const [secondsLeft, setSecondsLeft] = useState(secondsLeftRef.current);
  const [pause, setPause] = useState(pauseRef.current);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const handleReset = () => {
    if (selected && intervalRef.current) {
      secondsLeftRef.current = selected.duration * 60;
      pauseRef.current = false; setPause(pauseRef.current);
      clearInterval(intervalRef.current);
      onClose();
    }
  };

  const handleTimer = () => {
    console.log('iniciando contador');
    if (selected) {
      secondsLeftRef.current = selected.duration * 60;
      setTotalSeconds(selected.duration * 60);

      const interval = setInterval(() => {

        if (secondsLeftRef.current <= 0) handleReset();

        if (!pauseRef.current) {
          secondsLeftRef.current -= 1;
          setSecondsLeft(secondsLeftRef.current);
        }
      }, 1000);
      intervalRef.current = interval;
    }
  };

  useEffect(() => {
    if (open)
      handleTimer();
  }, [open]);


  return (
    <Backdrop
      sx={{ color: '#fff', backdropFilter: 'blur(3px)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Stack width={"300px"} height={"300px"}>
        {selected ? <>
          <CircularProgressbarWithChildren value={Math.trunc((secondsLeft / totalSeconds) * 100)}
          >
            <Typography variant='h2'> {Math.trunc((secondsLeft / totalSeconds) * 100)}% </Typography>
            <Typography variant='caption'> Temporizador </Typography>

          </CircularProgressbarWithChildren>
          <Grid container width={"90%"} sx={{ placeItems: "center" }} gap={2} m={'0 auto'} p={2} direction="column">
            <Button fullWidth onClick={handleReset} variant="contained">
              Terminar
            </Button>
            {
              !pause
                ? (
                  <Button fullWidth
                    color='info'
                    variant='contained'
                    onClick={() => { pauseRef.current = true; setPause(pauseRef.current); }}>
                    Pausar
                  </Button>
                )
                : (
                  <Button fullWidth
                    color='success'
                    variant='contained'
                    onClick={() => { pauseRef.current = false; setPause(pauseRef.current); }}>
                    Continuar
                  </Button>
                )
            }
          </Grid>
        </> : <Typography variant='h2'>Ninguna sesión seleccionada</Typography>}

      </Stack>
    </Backdrop>
  );
}
