import {
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Divider
} from '@mui/material';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from '../../src/components/common';
import { useFormik } from 'formik';
import { getNameByID } from '../../src/services';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks.redux';
import { startLoadCareers } from '../../src/redux/thunks/career.thunks';
import { startRegisterUser } from '../../src/redux/thunks/auth.thunks';
import { useRouter } from 'next/router';


const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { careers } = useAppSelector(state => state.career);

  const { token } = useAppSelector(state => state.auth);

  if (token) {
    router.push('/home');
  }

  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(startLoadCareers());

  }, []);

  const careerSelected = (careers.length > 0 ? careers[0]._id : "");

  const formik = useFormik({
    initialValues: {
      id: '',
      name,
      email: '',
      career: careerSelected,
      password: '',
      repassword: '',
    },
    onSubmit: (values) => {
      const { career, email, id: identification, name: fullname, password } = values;

      dispatch(startRegisterUser({
        career,
        email,
        identification,
        fullname,
        password
      }));

    },
    validationSchema: Yup.object({
      id: Yup
        .string()
        .required('La identificación es requerida')
        .matches(/^[1-9]0\d{3}0\d{3}$/, 'el formato adecuado es X0XXX0XXX'),
      password: Yup
        .string()
        .required('La contraseña es requerida')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, 'La contraseña debe ser alfanumérica y tener un mínimo de 8 caracteres'),
      repassword: Yup
        .string()
        .required('La CONFIRMACIÓN de la contraseña es requerida')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, 'La contraseña debe ser alfanumérica y tener un mínimo de 8 caracteres')
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),

      name: Yup.string().required('Su nombre es requerido'),
      email: Yup.string().email('Formato incorrecto').required('Su correo electrónico es requerido'),
      career: Yup.string().min(1, 'Porfavor seleccione una carrera').required('Su carrera es requerida')
    }),
  });

  const handleIdentification = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length == 9) {
      //  TODO: petición HTPP para la cedula...
      getNameByID(value)
        .then(response => {
          const { data } = response;
          if (data.nombre) {
            setName(data.nombre);
            formik.setFieldValue('name', data.nombre);
            return;
          }
          setName('Identificación no encontrada');
        });
    }

    if (value.length < 10) {
      formik.setFieldValue('id', value);
      setName('');
    }
  };

  return (
    <Container sx={{ height: '100vh', display: 'grid', placeContent: 'center' }}>
      <Paper component={'form'} onSubmit={formik.handleSubmit} variant='elevation' sx={{ p: 2, overflow: 'auto', width: { sm: '90%', md: '90%' } }}>
        <Grid container spacing={1} flexDirection='column' sx={{ placeItems: 'center' }}>
          <Grid item>
            <Typography variant='h5' my={2} align='center'>
              Módulo de Ingreso
              <Divider sx={{ mt: 1 }} />
              <Typography variant='caption' color={'secondary'}>{name}</Typography>
            </Typography>
          </Grid>
          <Grid container spacing={2} maxWidth="md">
            <Grid item xs={12} sm={6}>
              <TextField onBlur={formik.handleBlur} fullWidth value={formik.values.id} onChange={handleIdentification} name={'id'} type={'text'} variant='filled' placeholder='Identificación' />
              {formik.touched.id && formik.errors.id && (
                <Typography variant='caption' color={'error'}>{formik.errors.id}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onBlur={formik.handleBlur} disabled fullWidth value={formik.values.name} onChange={formik.handleChange} name={'name'} variant='filled' placeholder='Nombre completo' />
              {formik.touched.name && formik.errors.name && (
                <Typography variant='caption' color={'error'}>{formik.errors.name}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onBlur={formik.handleBlur} fullWidth value={formik.values.email} onChange={formik.handleChange} name={'email'} variant='filled' placeholder='Correo Electronico' />
              {formik.touched.email && formik.errors.email && (
                <Typography variant='caption' color={'error'}>{formik.errors.email}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onBlur={formik.handleBlur} fullWidth value={formik.values.password} onChange={formik.handleChange} name={'password'} variant='filled' placeholder='Contraseña' type={'password'} />
              {formik.touched.password && formik.errors.password && (
                <Typography variant='caption' color={'error'}>{formik.errors.password}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onBlur={formik.handleBlur} fullWidth value={formik.values.repassword} onChange={formik.handleChange} name={'repassword'} variant='filled' placeholder='Confirma tu contraseña' type={'password'} />
              {formik.touched.repassword && formik.errors.repassword && (
                <Typography variant='caption' color={'error'}>{formik.errors.repassword}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item my={1}>

          <InputLabel sx={{ textAlign: 'center' }} id="career">¿Cual carrera estudia?</InputLabel>
          <Select
            labelId='career'
            fullWidth
            sx={{ mt: 1 }}
            value={formik.values.career}
            label="career"
            name={'career'}
            onChange={formik.handleChange}
          >
            {careers.map(career => {

              return (
                <MenuItem key={career._id} value={career._id}>
                  {career.name}
                </MenuItem>
              );

            })}

          </Select>
          {formik.touched.career && formik.errors.career && (
            <Typography variant='caption' color={'error'}>{formik.errors.career}</Typography>
          )}
        </Grid>
        <Grid item>
          <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mb: .5 }}>
            ¡Registrarme!
          </Button>

          <Link
            linkSx={{ listStyle: 'none', mt: .5 }}
            buttonVariant="text"
            children={
              <Typography variant='caption' align='center'>
                ¿Ya te encuentras registrado?
              </Typography>
            }
            fullWidth
            href='/auth'
          />
        </Grid>
      </Paper>
    </Container >
  );
};

export default RegisterPage;
