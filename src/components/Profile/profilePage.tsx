import { Avatar, IconButton, Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
import { Loading } from '../../../src/components';
import { RESPONSES } from '../../../src/interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../../src/redux/hooks';
import { startUpdateUser } from '../../../src/redux/thunks/user-thunks';
import { validationSchema } from './validationSchema/validateUserInfo';

const ProfilePage: React.FC = () => {

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const onSubmit = async (values: { id: string, email: string, name: string; }) => {
    const { email, id: identification, name: fullname } = values;

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Recuerda tus credenciales',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      const response = await dispatch(startUpdateUser({
        email,
        fullname,
        identification
      }));

      if (response !== RESPONSES.SUCCESS) {
        await Swal.fire(response);
      }
      await Swal.fire({
        title: 'Actualizado',
        text: 'Cambios aplicados',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      id: user.identification,
      name: user.fullname,
      email: user.email,
    },
    onSubmit,
    validationSchema,
  });

  if (!user) return <Loading called='profile' />;

  return (
    <Container maxWidth={'sm'} sx={{ mt: 2, display: 'block' }}>
      <Paper data-testid='profile-form' component={'form'} onSubmit={formik.handleSubmit} sx={{ py: 4, px: 2 }}>
        <Stack spacing={1} direction="column" sx={{ placeItems: 'center' }}>
          <IconButton>
            <Avatar src='https://scontent.fsjo9-1.fna.fbcdn.net/v/t39.30808-6/301999029_768418684471692_6904334561164990019_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=qU9upZvwbD8AX9W2_QB&_nc_ht=scontent.fsjo9-1.fna&oh=00_AfAMrmTizvtbNEoLUEyqBZIFAq7VPmZsEyroAiyKtFeJCQ&oe=6445C19C' />
          </IconButton>
          <TextField
            autoComplete='off'
            onBlur={formik.handleBlur}
            fullWidth value={formik.values.id}
            onChange={formik.handleChange}
            name={'id'}
            type={'text'}
            variant='filled'
            helperText="Usuario"
          />
          {formik.touched.id && formik.errors.id && (
            <Typography variant='caption' color={'primary.main'}>{formik.errors.id}</Typography>
          )}
          <TextField
            autoComplete='off'
            onBlur={formik.handleBlur}
            fullWidth value={formik.values.name}
            onChange={formik.handleChange}
            name={'name'}
            variant='filled'
            helperText="Nombre"
          />
          {formik.touched.name && formik.errors.name && (
            <Typography variant='caption' color={'primary.main'}>{formik.errors.name}</Typography>
          )}
          <TextField
            autoComplete='off'
            onBlur={formik.handleBlur}
            fullWidth value={formik.values.email}
            onChange={formik.handleChange}
            name={'email'}
            variant='filled'
            helperText="Correo Electronico"
          />
          {formik.touched.email && formik.errors.email && (
            <Typography variant='caption' color={'primary.main'}>{formik.errors.email}</Typography>
          )}

          <Button data-testid='button-update' type='submit' fullWidth variant='contained' color='success' sx={{ mb: .5 }}>
            Actualizar
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ProfilePage;

