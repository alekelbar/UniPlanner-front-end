import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch } from '../../redux/hooks';
import { startRemoveCareer } from '../../redux/thunks/user.thunks';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

interface CareerCardProps {
  title: string;
  id: string;
}

export const CareerCard: React.FC<CareerCardProps> = ({ title, id }) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRemove = async () => {
    const response = await dispatch(startRemoveCareer(id));
    switch (response) {
      case RESPONSES.UNAUTHORIZE:
        router.replace('auth');
        return;
      default:
        await Swal.fire('Desactivación', 'La carrera fue deshabilida');
        return;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          color='primary'
          onClick={() => console.log('ver cursos')}
        > Ver cursos
        </Button>
        <Button
          variant='text'
          color='secondary'
          onClick={handleRemove}
        > Desactivar
        </Button>
      </CardActions>
    </Card>
  );
};
