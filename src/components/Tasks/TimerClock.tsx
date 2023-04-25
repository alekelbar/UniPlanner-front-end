import { Backdrop, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatSeconds } from "./helpers/formatSeconds";
import { useAppSelector } from "../../redux";

interface TimerClockProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export default function TimerClock ({ open, onClose }: TimerClockProps): JSX.Element {

  const { selected } = useAppSelector(st => st.tasks);
  const theme = useTheme();

  const secondsRef = useRef(0);
  const pauseRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const [seconds, setSeconds] = useState(secondsRef.current);
  const [pause, setPause] = useState(pauseRef.current);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const handleReset = () => {
    if (selected && intervalRef.current) {
      secondsRef.current = 0;
      setSeconds(secondsRef.current);
      pauseRef.current = false; setPause(pauseRef.current);
      clearInterval(intervalRef.current);
      onClose();
    }
  };

  const handleTimer = () => {
    if (selected) {
      secondsRef.current = 0;
      setTotalSeconds(secondsRef.current);

      const interval = setInterval(() => {
        if (!pauseRef.current) {
          secondsRef.current += 1;
          setSeconds(secondsRef.current);
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
      <Stack sx={{
        width: {
          xs: '80%',
          sm: '50%',
          md: '40%',
          lg: '30%',
          xl: '20%'
        }
      }}>
        {selected ? <>
          <CircularProgressbarWithChildren data-testid="session-clock" value={100} styles={buildStyles({
            pathColor: (pause)
              ? theme.palette.success.main
              : theme.palette.info.main,
          })}
          >
            <Typography variant='h4'>{formatSeconds(seconds)}</Typography>
            <Typography variant='subtitle2'> {selected.name}</Typography>

          </CircularProgressbarWithChildren>
          <Grid container
            width={"90%"}
            sx={{ placeItems: "center" }}
            gap={2}
            m={'0 auto'}
            p={2}
            direction="column">
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
