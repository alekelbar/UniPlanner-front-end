import {
  Container,
  Divider, Grid,
  IconButton,
  InputLabel,
  MenuItem, Select,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';


import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, Loading } from '../../src/components';
import { useAllCareers } from '../../src/hooks/Carrers/useAllCarrers';
import { RESPONSES } from '../../src/interfaces/response-messages';
import { UserState } from '../../src/interfaces/users.interface';
import { useAppDispatch } from '../../src/redux/hooks';
import { startUserRegister } from '../../src/redux/thunks/user-thunks';
import { validateToken } from '../../src/services/auth/validate-token';


const RegisterPage: React.FC = () => {

  const { allCareers, loading } = useAllCareers();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      id: '',
      name: "",
      email: '',
      career: '',
      password: '',
      repassword: '',
    },
    onSubmit: async (values) => {
      const { career, email, id: identification, name: fullname, password } = values;

      const response = await dispatch(startUserRegister({
        careers: [career],
        email,
        identification,
        fullname,
        password
      }));

      if (response !== RESPONSES.SUCCESS) {
        let responsesMessage = "";
        switch (response) {
          case RESPONSES.UNAUTHORIZE:
            responsesMessage = "Parece que su credenciales son invalidas 🔒";
            break;
          default:
            responsesMessage = "Ocurrio un error con el servidor";
            break;
        }
        await Swal.fire({
          title: "Hubo un inconveniente 😊",
          icon: 'info',
          text: responsesMessage,
        });
        return;
      }

      router.push('/home/careers');
    },
    validationSchema: Yup.object({
      id: Yup
        .string()
        .required('La identificación es requerida')
        .min(8, 'Su atributo identificador debe ser de almenos 8 caracteres'),
      password: Yup
        .string()
        .required('La contraseña es requerida')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, 'La contraseña debe ser alfanumérica y tener un mínimo de 8 caracteres'),
      repassword: Yup
        .string()
        .required('La CONFIRMACIÓN de la contraseña es requerida')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, 'La contraseña debe ser alfanumérica y tener un mínimo de 8 caracteres')
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),

      name: Yup.string().required('Su nombre es requerido').min(8, 'Su nombre debe ser más largo'),
      email: Yup.string().email('Formato incorrecto').required('Su correo electrónico es requerido'),
      career: Yup.string().min(1, 'Porfavor seleccione una carrera').required('Su carrera es requerida')
    }),
  });

  useEffect(() => {
    if (allCareers.length)
      formik.setFieldValue('career', allCareers[0]._id);
  }, [allCareers]);

  if (loading) return <Loading called='register' />;

  return (
    <Container sx={{
      display: 'flex',
      height: '90vh',
    }}>
      <Grid container sx={{ display: 'grid', placeConteqnt: 'center' }}>
        <Box component={'form'} onSubmit={formik.handleSubmit} sx={{ p: 4, overflow: 'auto' }}>
          <Typography variant='h5' my={2} align='center' width={'100%'}>
            Registro
            <Divider sx={{ my: 1 }} />
          </Typography>
          <Grid container spacing={1} flexDirection='column' sx={{ placeItems: 'center' }}>
            <Grid container spacing={1} maxWidth="md">
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='off'
                  onBlur={formik.handleBlur}
                  fullWidth
                  value={formik.values.id}
                  onChange={formik.handleChange}
                  name={'id'}
                  variant='filled'
                  helperText="Usuario"
                  placeholder='alekelbar...' />
                {formik.touched.id && formik.errors.id && (
                  <Typography variant='caption' color={'error'}>{formik.errors.id}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Tooltip title="Puedes modificar tu nombre a tu gusto">
                  <TextField
                    autoComplete='off'
                    onBlur={formik.handleBlur}
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    name={'name'}
                    variant='filled'
                    helperText="Nombre"
                    placeholder='John Doe...' />
                </Tooltip>
                {formik.touched.name && formik.errors.name && (
                  <Typography variant='caption' color={'error'}>{formik.errors.name}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='off'
                  onBlur={formik.handleBlur}
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name={'email'}
                  variant='filled'
                  helperText="Correo electronico"
                  placeholder='you@gmail.com'
                />
                {formik.touched.email && formik.errors.email && (
                  <Typography variant='caption' color={'error'}>{formik.errors.email}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='off'
                  onBlur={formik.handleBlur}
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name={'password'}
                  variant='filled'
                  helperText="Contraseña"
                  placeholder='MyPassword_secure' type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(prev => !prev)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    )
                  }}
                />
                {formik.touched.password && formik.errors.password && (
                  <Typography variant='caption' color={'error'}>{formik.errors.password}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='off'
                  onBlur={formik.handleBlur}
                  fullWidth
                  value={formik.values.repassword}
                  onChange={formik.handleChange}
                  name={'repassword'}
                  variant='filled'
                  helperText="confirme su contraseña"
                  placeholder='MyPassword_secure' type={showConfirmPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowConfirmPassword(prev => !prev)}
                        edge="end"
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    )
                  }}
                />
                {formik.touched.repassword && formik.errors.repassword && (
                  <Typography variant='caption' color={'error'}>{formik.errors.repassword}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item my={1}>
            <InputLabel sx={{ textAlign: 'center' }} id="career">¿Cual carrera estudia?</InputLabel>
            <Tooltip title={"Mas adelante podras agregar otras"} placement='top-end'>
              <Stack sx={{ placeItems: 'center' }}>
                <Select
                  labelId='career'
                  sx={{ mt: 1 }}
                  value={formik.values.career}
                  label="career"
                  name={'career'}
                  onChange={formik.handleChange}
                >
                  {allCareers.map(career => {
                    return (
                      <MenuItem key={career._id} value={career._id}>
                        {career.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Stack>
            </Tooltip>
            {formik.touched.career && formik.errors.career && (
              <Typography variant='caption' color={'error'}>{formik.errors.career}</Typography>
            )}
          </Grid>
          <Grid item>
            <Stack sx={{ placeItems: 'center' }}>
              <Button type='submit' variant='contained' color='primary' sx={{ mb: .5 }}>
                ¡Registrarme!
              </Button>
            </Stack>
            <Box mt={1}>
              <Link
                href='/auth'
                sx={{ textDecoration: 'none', listStyle: 'none', mt: .5, color: 'text.secondary' }}
              >
                <Typography variant='body1' align='center'>
                  ¿Ya te encuentras registrado?
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Box>
      </Grid >
    </Container>
  );
};

export default RegisterPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;

  if (token) {
    const parseToken: UserState = JSON.parse(token);
    const tokenString = parseToken.token;

    if ((await validateToken(tokenString))) {
      return {
        redirect: {
          destination: '/home/careers',
          permanent: false,
        },
      };
    };
  }
  return {
    props: {
    }
  };
};
