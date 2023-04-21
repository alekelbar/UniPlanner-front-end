import {
  Container,
  Divider, Grid, TextField,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import { Link } from '../../src/components';
import { RESPONSES } from '../../src/interfaces/response-messages';
import { UserState } from '../../src/interfaces/users.interface';
import { useAppDispatch } from '../../src/redux/hooks';
import { startUserLogin } from '../../src/redux/thunks/user-thunks';
import { validateToken } from '../../src/services/auth/validate-token';


const LoginPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      id: '',
      password: '',
    },
    onSubmit: async (values) => {
      const { id, password } = values;
      const response = await dispatch(startUserLogin({ identification: id, password }));


      if (response !== RESPONSES.SUCCESS) {
        await Swal.fire(response);
        return;
      }
      router.push('/');
    },
    validationSchema: Yup.object({
      id: Yup
        .string()
        .required('Su identificación es requerida')
        .min(8, 'Su atributo identificador debe ser de almenos 8 caracteres'),
      password: Yup
        .string()
        .required('Su contraseña es requerida')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, 'La contraseña debe ser alfanumérica y tener un mínimo de 8 caracteres'),
    })
  });


  return (
    <Container sx={{
      display: 'flex',
      height: '90vh',
    }}>
      <Grid container sx={{ placeContent: 'center', }}>
        <Box component={'form'} onSubmit={formik.handleSubmit} sx={{ p: 4 }}>
          <Grid item>
            <Typography variant='h5' my={2} align='center' width={'100%'}>
              Ingreso
              <Divider sx={{ mt: 1 }} />
            </Typography>
            <Grid container spacing={2} maxWidth="md">
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='off'
                  onBlur={formik.handleBlur}
                  fullWidth onChange={formik.handleChange}
                  value={formik.values.id}
                  name='id'
                  variant='filled'
                  placeholder='Identificación'
                  helperText="Un identificador único"
                />
                {formik.touched.id && formik.errors.id && <Typography variant='caption' color={'primary.contrastText'}>{formik.errors.id}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='off'
                  onBlur={formik.handleBlur}
                  fullWidth onChange={formik.handleChange}
                  value={formik.values.password}
                  name='password'
                  variant='filled'
                  placeholder='Contraseña'
                  type={'password'}
                  helperText="Su contraseña"
                />
                {formik.touched.password && formik.errors.password && <Typography variant='caption' color={'primary.contrastText'}>{formik.errors.password}</Typography>}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} >

            <Button fullWidth type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
              ¡Ingresar!
            </Button>

            <Box mt={1}>
              <Link
                href='auth/register'
                sx={{ textDecoration: 'none', listStyle: 'none', mt: .5, width: '100', color: 'text.secondary' }}
              >
                <Typography variant='body1' align='center'>
                  ¿Todavía no tienes una cuenta?
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Box>
      </Grid >
    </Container>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;

  if (token) {
    const parseToken: UserState = JSON.parse(token);
    const tokenString = parseToken.token;

    if ((await validateToken(tokenString))) {
      return {
        redirect: {
          destination: '/schedule/careers',
          permanent: false,
        },
      };
    };
  }

  return {
    props: {
    },
  };

};