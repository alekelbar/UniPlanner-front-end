import { Backdrop, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface ILoadingProps {
  called?: string;
}

export function Loading ({ called = ' unknow' }: ILoadingProps): JSX.Element {
  console.log('called by: ', called);

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
      <CircularProgress variant="indeterminate" color="primary" value={progress} />
      <Typography variant="h6" component="div">
        Cargando...
      </Typography>
    </Backdrop>
  );
}
