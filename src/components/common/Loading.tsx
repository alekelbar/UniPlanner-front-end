import { Backdrop, CircularProgress } from '@mui/material';

export const Loading = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};
