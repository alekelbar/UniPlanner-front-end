import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function NotFoundPage (): JSX.Element {
  const router = useRouter();
  const handleGoHome = () => {
    router.push(`/`);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6" align="center">
          Oops! Parece que estás perdido 😞
        </Typography>
        <Divider />
        <Typography align="center">
          La página que estás buscando no existe o ha sido movida.
        </Typography>
        <Button onClick={handleGoHome} variant="contained">
          Volver a la página de inicio
        </Button>
      </Stack>
    </Container>
  );
}
