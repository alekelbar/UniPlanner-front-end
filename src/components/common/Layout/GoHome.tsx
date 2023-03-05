import { Button, Divider, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';


export default function GoHome (): JSX.Element {
  const router = useRouter();
  return (
    <Container sx={{ py: 4 }}>
      <Stack
        spacing={2}
        direction={'column'}
        sx={{ placeItems: 'center' }}>
        <Typography
          variant='h6'
          align='center'>
          No se como llegaste hasta aquí pequeño saltamontes 😥,
          pero dejame llevarte a casa.
        </Typography >
        <Divider />
        <Button
          onClick={() => router.push('/home/careers')}
          className='animate__infinite animate__animated animate__pulse'
          variant='contained'>
          Volver a casa con mamá: 🤒
        </Button>
      </Stack>
    </Container>
  );
}
