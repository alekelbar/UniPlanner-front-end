import { Backdrop, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export function Loading (): JSX.Element {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Backdrop open={true}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <CircularProgress variant="determinate" color="primary" value={progress} />
      <Typography variant="h6" component="div">
        Cargando...
      </Typography>
    </Backdrop>
  );
}
