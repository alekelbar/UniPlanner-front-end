import { Backdrop, CircularProgress } from '@mui/material';

export function Loading (): JSX.Element {
  return (
    <Backdrop open={true}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Backdrop>
  );
}
