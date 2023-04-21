import { Close, Pause, PlayArrow } from "@mui/icons-material";
import { Backdrop, Button, Container, Stack, Typography, useTheme } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { clearInterval, setInterval } from 'timers';
import { SESSION_TYPES, Session } from '../../../interfaces/session-interface';
import { Loading } from '../../common';
import { sessionPageContext } from '../SessionPage';


interface IControlsEnd {
  onClick: () => void;
}


export const ControlsEnd: React.FC<IControlsEnd> = ({ onClick }) => {
  return (
    <Button size="large" sx={{ borderRadius: 8 }} onClick={onClick} variant="outlined" color={'error'}>
      <Close sx={{ fontSize: "2em" }} />
    </Button>
  );
};

interface IControlsPause {
  onClick: () => void;
}


export const ControlsPause: React.FC<IControlsPause> = ({ onClick }) => {
  return (
    <Button size="large" sx={{ borderRadius: 8 }} onClick={onClick} variant="contained">
      <Pause sx={{ fontSize: "2em" }} />
    </Button>
  );
};

interface IControlsContinue {
  onClick: () => void;
}

export const ControlsContinue: React.FC<IControlsContinue> = ({ onClick }) => {
  return (
    <Button size="large" sx={{
      borderRadius: 8
    }} onClick={onClick} variant="contained">
      <PlayArrow sx={{ fontSize: "2em" }} />
    </Button>
  );
};

interface ITimerClockControls {
  children: JSX.Element | JSX.Element[];
}

export const TimerControls: React.FC<ITimerClockControls> = ({ children }) => {

  return (
    <Container sx={{
      gap: 2,
      width: '100%',
      placeItems: 'center',
      mt: 2,
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      {children}
    </Container>
  );
};

interface ITimer {
  dialogHandler: { open: boolean, onClose: () => void; };
  session: Session;
}

export const SessionTimer: React.FC = () => {

  const {
    sessionState: {
      selected: session
    },
    clock: dialogHandler

  } = useContext(sessionPageContext);

  const { onCloseClock: onClose, openClock: open } = dialogHandler;

  const secondsLeftRef = useRef(0);
  const pauseRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const [secondsLeft, setSecondsLeft] = useState(secondsLeftRef.current);
  const [pause, setPause] = useState(pauseRef.current);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const handleReset = () => {
    if (session && intervalRef.current) {
      secondsLeftRef.current = session.duration * 60;
      pauseRef.current = false; setPause(pauseRef.current);
      clearInterval(intervalRef.current);
      onClose();
    }
  };

  const handleTimer = () => {
    if (session) {
      secondsLeftRef.current = session.duration * 60;
      setTotalSeconds(session.duration * 60);

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

  if (open && !session) return <Loading called="timer" />;

  return (
    <Backdrop
      data-testid={'timer-back'}
      sx={{ color: '#fff', backdropFilter: 'blur(3px)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Stack width={"200px"} height={"200px"}>
        {session ? <>
          <CircularProgressbarWithChildren
            value={Math.trunc((secondsLeft / totalSeconds) * 100)}
            styles={buildStyles({
              pathColor: (session.type === SESSION_TYPES.RESTING)
                ? '#95E1D3'
                : '#F38181',
            })}
          >
            <Typography variant='caption' fontSize={'2em'}> {Math.trunc((secondsLeft / totalSeconds) * 100)}% </Typography>
            <Typography data-testid='session-clock' variant='caption'> Temporizador </Typography>

          </CircularProgressbarWithChildren>
          <TimerControls>
            <ControlsEnd onClick={handleReset} />
            {
              !pause
                ? (<ControlsPause onClick={() => { pauseRef.current = true; setPause(pauseRef.current); }} />)
                : (<ControlsContinue onClick={() => { pauseRef.current = false; setPause(pauseRef.current); }} />)
            }
          </TimerControls>
        </> : <Typography variant='h2'>Ninguna sesión seleccionada</Typography>}

      </Stack>
    </Backdrop>
  );
}



