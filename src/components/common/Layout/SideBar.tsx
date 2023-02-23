import { Logout, Person, School } from '@mui/icons-material';
import { Drawer, Grid, Typography, Button } from '@mui/material';
import { Container } from '@mui/system';
import React, { useRef } from 'react';
import { LargeLogo } from '../LargeLogo';
import { ButtonLink } from '../ButtonLink';
import { useAppDispatch } from '../../../redux/hooks';
import { onLogOut } from '../../../redux/slices/auth/authSlice';
import { useRouter } from 'next/router';
import { logOut } from '../../../helpers/local-storage';

interface SideBarProps {
  open: boolean,
  onClose: () => void,
}

interface Page {
  title: string,
  url: string,
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined,
  icon: React.ReactNode;
}
const pages: Page[] = [
  { title: 'Carreras', color: 'secondary', url: "", icon: <School /> },
  { title: 'Perfil', color: 'secondary', url: "profile", icon: <Person /> },
];

export const SideBar: React.FC<SideBarProps> = ({ onClose, open }) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const drawerRef = useRef<HTMLDivElement>(null);

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.clientX > 150) {
      onClose();
    }
  };

  const handleLogOut = () => {
    dispatch(onLogOut());
    logOut();
    router.push('/auth');
  };

  return (
    <Container onClick={handleClose}>
      <Drawer
        sx={{
          backdropFilter: 'blur(3px)',
        }}
        variant='temporary'
        open={open}
        onKeyUp={(event) => {
          if (event.key === 'Escape') {
            onClose();
          }
        }}
        ref={drawerRef}
      >
        <Grid container maxWidth="lg" sx={{ width: '150px' }}>

          <Grid xs={12} item display={'flex'} flexDirection="column" sx={{ placeItems: 'center' }}>
            <LargeLogo />
          </Grid>
          <Grid container spacing={1} >
            {pages.map(page => {
              return (
                <Grid item xs={12} key={page.title}>
                  <ButtonLink
                    buttonVariant='outlined'
                    children={
                      <>
                        <Typography variant='caption'>{page.title}</Typography>
                        {page.icon}
                      </>
                    }
                    href={`/home/${page.url}`}
                    // fullWidth
                    buttonColor={page.color}
                    linkSx={{ textDecoration: 'none' }}
                    buttonSx={{ display: 'flex', justifyContent: 'space-between', px: '5px', py: '2px', width: '95%' }}
                  />
                </Grid>
              );
            })}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                sx={{ display: 'flex', justifyContent: 'space-between', px: '5px', py: '2px', width: '95%' }}
                onClick={() => handleLogOut()}
                color={'warning'}
              >
                <Typography variant='caption'>{'Salir'}</Typography>
                <Logout />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </Container >

  );
};
