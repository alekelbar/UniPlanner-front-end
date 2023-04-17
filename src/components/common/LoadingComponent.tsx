import { Container, LinearProgress } from '@mui/material';

export function LoadingComponent (): JSX.Element {
  return (
    <Container sx={{ display: 'flex', width: '100vw', placeItems: 'center' }}>
      <LinearProgress />
    </Container>
  );
}
