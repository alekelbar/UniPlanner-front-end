import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { UserState } from '../../src/interfaces/users.interface';
import { GetServerSideProps } from 'next';
import { Paper, TextField, Grid, Tooltip, Box } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppDispatch } from '../../src/redux/hooks';
import { getNameByID } from '../../src/services/identificationAPI/cedula.service';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Label } from '@mui/icons-material';
import Button from '@mui/material/Button';

interface Props {
  parseToken: UserState;
}

const Profile: React.FC<Props> = ({ parseToken }) => {

  const dispatch = useAppDispatch();

  const [Message, setMessage] = useState("");


  const router = useRouter();

  const { user } = parseToken;

  const formik = useFormik({
    initialValues: {
      id: user ? user.identification : '',
      name: user ? user.fullname : '',
      email: user ? user.email : '',
    },

    onSubmit: async (values) => {
      const { email, id: identification, name: fullname } = values;
      console.log(values);

      // const response = await dispatch(startUserRegister({
      //   careers: [career],
      //   email,
      //   identification,
      //   fullname,
      //   password
      // }));

      // if (response !== RESPONSES.SUCCESS) {
      //   await Swal.fire('Algo salio mal 😥', response);
      //   return;
      // }

      // router.push('/home');
    },
    validationSchema: Yup.object({
      id: Yup
        .string()
        .required('La identificación es requerida'),
      // .matches(/^[1-9]0\d{3}0\d{3}$/, 'el formato adecuado es X0XXX0XXX'),
      name: Yup.string().required('Su nombre es requerido').min(10, 'Su nombre debe ser más largo'),
      email: Yup.string().email('Formato incorrecto').required('Su correo electrónico es requerido'),
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
    <Container maxWidth="md" sx={{ mt: 2, display: 'block' }}>
      <Paper component={'form'} onSubmit={formik.handleSubmit} sx={{ py: 4, px: 2 }}>
        <Stack spacing={5} direction="column" sx={{ placeItems: 'center' }}>
          <Typography align='center' variant="subtitle1" component={'h2'}>
            Información de perfil
          </Typography>
          <Tooltip title={'Validamos tu cedula con los primeros 9 digitos.'}>
            <TextField
              autoComplete='off'
              onBlur={formik.handleBlur}
              fullWidth value={formik.values.id}
              onChange={formik.handleChange}
              name={'id'}
              type={'text'}
              variant='filled'
              helperText="Su Cédula"
            />
          </Tooltip>
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
            helperText="Su nombre"
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
            helperText="Su dirección de correo electronico"
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

export default Profile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { token } = ctx.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const parseToken = JSON.parse(token);

  if (Object.keys(parseToken).length < 3) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      parseToken,
    }
  };
};