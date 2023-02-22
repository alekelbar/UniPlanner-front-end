import {
  Divider, Grid,
  InputLabel,
  MenuItem, Select,
  TextField,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';


import { ButtonLink, Link } from '../../src/components';
import { useAppDispatch } from '../../src/redux/hooks.redux';
import { startUserRegister } from '../../src/redux/thunks/user.thunks';
import { getNameByID } from '../../src/services';
import { Career } from '../../src/services/API/Career/career.models';
import { CareerService } from '../../src/services/API/Career/career.service';
import { RESPONSES } from '../../src/helpers/interfaces/response-messages';
import Swal from 'sweetalert2';
import { error } from 'console';

interface Props {
  careers: Career[];
}

const RegisterPage: React.FC<Props> = ({ careers }) => {

  const dispatch = useAppDispatch();

  const [Message, setMessage] = useState("");

  const careerSelected = (careers.length > 0 ? careers[0]._id : "");

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      id: '',
      name: Message,
      email: '',
      career: careerSelected,
      password: '',
      repassword: '',
    },
    onSubmit: async (values) => {
      const { career, email, id: identification, name: fullname, password } = values;
      const careers = [career];

      const response = await dispatch(startUserRegister({
        career: careers,
        email,
        identification,
        fullname,
        password
      }));

      if (response !== RESPONSES.SUCCESS) {
        await Swal.fire('Algo salio mal 😥', response);
        return;
      }

      router.push('/home');
    },
    validationSchema: Yup.object({
      id: Yup
        .string()
        .required('La identificación es requerida'),
      // .matches(/^[1-9]0\d{3}0\d{3}$/, 'el formato adecuado es X0XXX0XXX'),
      password: Yup
        .string()
        .required('La contraseña es requerida')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, 'La contraseña debe ser alfanumérica y tener un mínimo de 8 caracteres'),
      repassword: Yup
        .string()
        .required('La CONFIRMACIÓN de la contraseña es requerida')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, 'La contraseña debe ser alfanumérica y tener un mínimo de 8 caracteres')
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),

      name: Yup.string().required('Su nombre es requerido').min(10, 'Su nombre debe ser más largo'),
      email: Yup.string().email('Formato incorrecto').required('Su correo electrónico es requerido'),
      career: Yup.string().min(1, 'Porfavor seleccione una carrera').required('Su carrera es requerida')
    }),
  });

  const handleIdentification = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    formik.setFieldValue('id', value);

    if (value.length == 9) {
      //  TODO: petición HTPP para la cedula...
      const { data } = await getNameByID(value);
      if (data.resultcount === 1) {
        const { nombre } = data;
        setMessage(nombre);
        formik.setFieldValue('name', nombre);
        return;
      }
      setMessage('Identificación no encontrada');
    }
  };

  return (
    <Grid container sx={{ display: 'grid', placeContent: 'center' }}>
      <Box component={'form'} onSubmit={formik.handleSubmit} sx={{ p: 4, overflow: 'auto' }}>
        <Typography variant='h5' my={2} align='center' width={'100%'}>
          Registro
          <Divider sx={{ my: 1 }} />
          <Typography variant='caption' color={'secondary'}>{Message}</Typography>
        </Typography>
        <Grid container spacing={1} flexDirection='column' sx={{ placeItems: 'center' }}>
          <Grid item>
          </Grid>
          <Grid container spacing={1} maxWidth="md">
            <Grid item xs={12} sm={6}>
              <TextField autoComplete='off' onBlur={formik.handleBlur} fullWidth value={formik.values.id} onChange={handleIdentification} name={'id'} type={'text'} variant='filled' placeholder='Identificación' />
              {formik.touched.id && formik.errors.id && (
                <Typography variant='caption' color={'error'}>{formik.errors.id}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete='off' onBlur={formik.handleBlur} fullWidth value={formik.values.name} onChange={formik.handleChange} name={'name'} variant='filled' placeholder='Nombre completo' />
              {formik.touched.name && formik.errors.name && (
                <Typography variant='caption' color={'error'}>{formik.errors.name}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete='off' onBlur={formik.handleBlur} fullWidth value={formik.values.email} onChange={formik.handleChange} name={'email'} variant='filled' placeholder='Correo Electronico' />
              {formik.touched.email && formik.errors.email && (
                <Typography variant='caption' color={'error'}>{formik.errors.email}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete='off' onBlur={formik.handleBlur} fullWidth value={formik.values.password} onChange={formik.handleChange} name={'password'} variant='filled' placeholder='Contraseña' type={'password'} />
              {formik.touched.password && formik.errors.password && (
                <Typography variant='caption' color={'error'}>{formik.errors.password}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete='off' onBlur={formik.handleBlur} fullWidth value={formik.values.repassword} onChange={formik.handleChange} name={'repassword'} variant='filled' placeholder='Confirma tu contraseña' type={'password'} />
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
          <Box mt={1}>
            <Link
              href='/auth'
              sx={{ listStyle: 'none', mt: .5 }}
            >
              <Typography variant='caption' align='center'>
                ¿Ya te encuentras registrado?
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Box>
    </Grid >
  );
};

export default RegisterPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { token } = ctx.req.cookies;

  if (token) {
    const parseToken = JSON.parse(token);

    if (Object.keys(parseToken).length >= 3 && parseToken.token !== null) {
      return {
        redirect: {
          destination: '/home',
          permanent: false,
        },
      };
    }
  }

  const service = CareerService.createService("v1");

  const { data } = await service.listAll();

  return {
    props: {
      careers: data
    }
  };

};
