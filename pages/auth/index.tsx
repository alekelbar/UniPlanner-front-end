import {
  Grid,
  Paper,
  TextField,
  Typography,
  Divider
} from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from '../../src/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getNameByID } from '../../src/services/identificationAPI/index';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks.redux';
import { startUserLogin } from '../../src/redux/thunks/auth.thunks';
import { useRouter } from 'next/router';

const LoginPage = () => {

  const dispatch = useAppDispatch();

  const router = useRouter();

  const [name, setName] = useState("");

  const { token } = useAppSelector(state => state.auth);

  if (token) {
    router.push('/home');
  }

  const formik = useFormik({
    initialValues: {
      id: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
      const { id, password } = values;
      dispatch(startUserLogin({ identification: id, password }));
    },
    validationSchema: Yup.object({
      id: Yup
        .string()
        .required('La identificación es requerida')
        .matches(/^[1-9]0\d{3}0\d{3}$/, 'el formato adecuado es X0XXX0XXX'),
      password: Yup
        .string()
        .required('La contraseña es requerida')
      // .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, 'La contraseña debe ser alfanumérica y tener un mínimo de 8 caracteres')
    })
  });

  const handleIdentification = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length == 9) {
      //  TODO: petición de HTPP para la cedula...
      getNameByID(value)
        .then(response => {

          const { data } = response;
          if (data.nombre) {
            setName(data.nombre);
            return;
          }
          setName('Identificación no encontrada');
        });
    }
    if (value.length < 10)
      formik.setFieldValue('id', value);
  };

  return (
    <Container sx={{ height: '100vh', display: 'grid', placeContent: 'center' }}>
      <Paper component={'form'} onSubmit={formik.handleSubmit} variant='elevation' sx={{ p: 4 }}>
        <Grid item>
          <Grid container spacing={2} display={'grid'} sx={{ placeContent: 'center' }}>
            <Typography variant='h5' my={2} align='center'>
              Módulo de Ingreso
              <Divider sx={{ mt: 1 }} />
              <Typography variant='caption' color={'secondary'}>{name}</Typography>
            </Typography>
          </Grid>
          <Grid container spacing={2} maxWidth="md">
            <Grid item xs={12} sm={6}>
              <TextField onBlur={formik.handleBlur} fullWidth onChange={handleIdentification} value={formik.values.id} name='id' type={'text'} variant='filled' placeholder='Identificación' />
              {formik.touched.id && formik.errors.id && <Typography variant='caption' color={'error'}>{formik.errors.id}</Typography>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onBlur={formik.handleBlur} fullWidth onChange={formik.handleChange} value={formik.values.password} name='password' variant='filled' placeholder='Contraseña' type={'password'} />
              {formik.touched.password && formik.errors.password && <Typography variant='caption' color={'error'}>{formik.errors.password}</Typography>}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} >

          <Button fullWidth type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
            ¡Ingresar!
          </Button>

          <Link
            linkSx={{ listStyle: 'none', mt: .5, width: '100%' }}
            buttonVariant="text"
            children={
              <Typography variant='caption' align='center'>
                ¿Ya tienes una cuenta?
              </Typography>
            }
            fullWidth
            href='/auth/register'
          />

        </Grid>
      </Paper>
    </Container >
  );
};

export default LoginPage;
