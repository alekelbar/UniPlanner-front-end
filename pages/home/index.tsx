import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../src/redux/hooks.redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home () {
  const router = useRouter();
  const { token } = useAppSelector(s => s.auth);

  useEffect(() => {
    if (!token) router.push('/auth');
  }, [token, router]);

  return (
    <Container maxWidth="lg">
      <Typography>Hola mundo!</Typography>
    </Container>
  );
}