import { ColorLens, Settings } from '@mui/icons-material';
import { Button, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Loading } from '../../src/components';
import { isValidToken } from '../../src/helpers/isValidToken';
import { RESPONSES } from '../../src/interfaces/response-messages';
import { Setting } from '../../src/interfaces/settings-interfaces';
import { useAppDispatch, useAppSelector } from '../../src/redux';
import { startLoadSetting, startUpdateSetting } from '../../src/redux/thunks/settings-thunks';

const SettingsPage = () => {

  const { selected } = useAppSelector(state => state.setting);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onLoad = async () => {
    const response = await dispatch(startLoadSetting());
    if (response !== RESPONSES.SUCCESS) {
      if (response === RESPONSES.UNAUTHORIZE) {
        router.push('/auth');
        await Swal.fire('Parece que tú sesión expiro, inicia sesión porfavor... 😥', response);
        return;
      }
      await Swal.fire('Algo salio mal 😥', response);
    }
  };

  useEffect(() => {
    if (!selected) {
      onLoad();
    }
  }, [selected]);

  useEffect(() => {
    if (selected) {
      formik.setFieldValue('importance', selected.importance);
      formik.setFieldValue('urgency', selected.urgency);
      formik.setFieldValue('do', selected.do);
      formik.setFieldValue('prepare', selected.prepare);
      formik.setFieldValue('delegate', selected.delegate);
      formik.setFieldValue('ignore', selected.ignore);
    }
  }, [selected]);


  const formik = useFormik({
    initialValues: {
      importance: 3,
      urgency: 1,
      do: "#f10909",
      prepare: "#093fe1",
      delegate: "#00e62e",
      ignore: "#e9d60c"
    },
    onSubmit: async (values) => {
      const { user, _id } = selected as Setting;
      const response = await dispatch(startUpdateSetting({ ...values, user, _id }));
      if (response !== RESPONSES.SUCCESS) {
        if (response === RESPONSES.UNAUTHORIZE) {
          router.push('/');
          await Swal.fire('Parece que tú sesión expiro, inicia sesión porfavor... 😥', response);
          return;
        }
        await Swal.fire('Algo salio mal 😥', response);
      }
      await Swal.fire('Preferencias actualizadas 👌');
    },
    validationSchema: Yup.object({
      importance: Yup
        .number()
        .min(0, "El valor minimo es cero")
        .max(100, 'El valor máximo es 100')
        .required('Su preferencia de valor es obligatoria'),
      do: Yup.string().required(),
      prepare: Yup.string().required(),
      delegate: Yup.string().required(),
      ignore: Yup.string().required(),
    })
  });

  if (!selected) return <Loading />;

  return (
    <Container>
      <Paper sx={{ my: 2, width: '100%', py: 2 }} component={'form'} onSubmit={formik.handleSubmit}>
        <Stack justifyContent={'center'} alignItems={'center'} direction={'row'}>
          <Typography variant='h5'>Configuraciones de usuario</Typography>
        </Stack>
        <Container>
          {/* Dividir el area en dos partes */}
          <Grid container direction={'row'} >
            {/* Parte A */}
            <Grid item xs={12} sm={6}>
              <Stack direction={'row'} justifyContent={'center'}>
                <Typography variant='subtitle1'>
                  <ColorLens sx={{ fontSize: '4em' }} />
                </Typography>
              </Stack>
              <Stack mt={3}
                direction={'column'}
                alignItems={'center'}
                spacing={2}
                justifyContent={'space-evenly'}
                width={'100%'}>
                <TextField
                  type="color"
                  sx={{
                    width: '70%'
                  }}
                  name={'do'}
                  value={formik.values.do}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={'Realizar'}
                />
                {formik.touched.do && formik.errors.do && (
                  <Typography variant='caption' color={'error'}>{formik.errors.do}</Typography>
                )}
                <TextField
                  type="color"
                  sx={{
                    width: '70%'
                  }}
                  name={'prepare'}
                  value={formik.values.prepare}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={'Preparar'}
                />
                {formik.touched.prepare && formik.errors.prepare && (
                  <Typography variant='caption' color={'error'}>{formik.errors.prepare}</Typography>
                )}
                <TextField
                  type="color"
                  sx={{
                    width: '70%'
                  }}
                  name={'delegate'}
                  value={formik.values.delegate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={'Delegar'}
                />
                {formik.touched.delegate && formik.errors.delegate && (
                  <Typography variant='caption' color={'error'}>{formik.errors.delegate}</Typography>
                )}
                <TextField
                  type="color"
                  sx={{
                    width: '70%'
                  }}
                  name={'ignore'}
                  value={formik.values.ignore}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={'Ignorar'}
                />
                {formik.touched.ignore && formik.errors.ignore && (
                  <Typography variant='caption' color={'error'}>{formik.errors.ignore}</Typography>
                )}
              </Stack>
            </Grid>
            {/* Parte B */}
            <Grid item xs={12} sm={6}>
              <Stack direction={'row'} justifyContent={'center'}>
                <Typography variant='subtitle1'>
                  <Settings sx={{ fontSize: '4em' }} color='secondary' />
                </Typography>
              </Stack>
              <Stack direction={'column'} alignItems={'center'} spacing={2}>
                <TextField
                  sx={{
                    maxWidth: '80%',
                  }}
                  name={'importance'}
                  value={formik.values.importance}
                  onChange={formik.handleChange}
                  helperText={'¿Apartir de cuanto valor una tarea es considerada importante?'}
                  type='number' />
                {formik.touched.importance && formik.errors.importance && (
                  <Typography variant='caption' color={'error'}>{formik.errors.importance}</Typography>
                )}
                <Button data-testid='aply-changes' type='submit' variant='contained'>Aplicar cambios</Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Container>
  );
};

export default SettingsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  return !token || !(await isValidToken(JSON.parse(token).token))
    ? {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    }
    : {
      props: {},
    };
};
