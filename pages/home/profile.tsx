import { Avatar, IconButton, Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Loading } from '../../src/components';
import { RESPONSES } from '../../src/interfaces/response-messages';
import { UserState } from '../../src/interfaces/users.interface';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks';
import { startUpdateUser } from '../../src/redux/thunks/user-thunks';
import { validateToken } from '../../src/services/auth/validate-token';
import { isValidToken } from '../../src/helpers/isValidToken';

interface Props {
  parseToken: UserState;
}

const ProfilePage: React.FC<Props> = () => {

  const dispatch = useAppDispatch();

  const router = useRouter();

  const { user } = useAppSelector(st => st.auth);


  const formik = useFormik({
    initialValues: {
      id: user ? user.identification : '',
      name: user ? user.fullname : '',
      email: user ? user.email : '',
    },

    onSubmit: async (values) => {
      const { email, id: identification, name: fullname } = values;

      const response = await dispatch(startUpdateUser({
        email,
        fullname,
        identification
      }));

      if (response !== RESPONSES.SUCCESS) {

        if (response === RESPONSES.UNAUTHORIZE) {
          await Swal.fire('Algo salio mal 😥', response);
          router.push('/');
          return;
        }

        await Swal.fire('Algo salio mal 😥', response);
        return;
      }

      await Swal.fire('Tú información fue actualizada con exito 🥰');

    },
    validationSchema: Yup.object({
      id: Yup
        .string()
        .required('La identificación es requerida')
        .min(8, 'Su atributo identificador debe ser de almenos 8 caracteres'),
      name: Yup.string().required('Su nombre es requerido').min(8, 'Su nombre debe ser más largo'),
      email: Yup.string().email('Formato incorrecto').required('Su correo electrónico es requerido'),
    }),
  });

  if (!user) return <Loading />;


  return (
    <Container maxWidth="md" sx={{ mt: 2, display: 'block' }}>
      <Paper component={'form'} onSubmit={formik.handleSubmit} sx={{ py: 4, px: 2 }}>
        <Stack spacing={1} direction="column" sx={{ placeItems: 'center' }}>
          <IconButton>
            <Avatar />
          </IconButton>
          <TextField
            autoComplete='off'
            onBlur={formik.handleBlur}
            fullWidth value={formik.values.id}
            onChange={formik.handleChange}
            name={'id'}
            type={'text'}
            variant='filled'
            helperText="Su usuario"
          />
          {formik.touched.id && formik.errors.id && (
            <Typography variant='caption' color={'error'}>{formik.errors.id}</Typography>
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
            <Typography variant='caption' color={'error'}>{formik.errors.name}</Typography>
          )}
          <TextField
            autoComplete='off'
            onBlur={formik.handleBlur}
            fullWidth value={formik.values.email}
            onChange={formik.handleChange}
            name={'email'}
            variant='filled'
            helperText="Dirección de correo electronico"
          />
          {formik.touched.email && formik.errors.email && (
            <Typography variant='caption' color={'error'}>{formik.errors.email}</Typography>
          )}

          <Button type='submit' fullWidth variant='contained' color='success' sx={{ mb: .5 }}>
            Actualizar
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  return !token || !(await isValidToken(JSON.parse(token).token))
    ? {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
    : {
      props: {},
    };
};