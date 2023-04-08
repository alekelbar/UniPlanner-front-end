import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAppSelector } from '../../redux';
import { Copyright } from '../common';
import { FloatButton } from '../common/FloatButton';
import { Loading } from '../common/Loading';
import { SideBar } from './SideBar';
import { Navbar } from './navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export function LayoutComponent ({ children }: LayoutProps): JSX.Element {

  const { loading } = useAppSelector(st => st.auth);

  const { pathname } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const homeComponent: JSX.Element =
    loading
      ? <Loading />
      : (
        <>
          <Navbar onOpen={onOpen} />
          <SideBar onClose={onClose} open={open} />
          <FloatButton
            onAction={() => { router.back(); }}
            icon={<ArrowBack />}
            sxProps={{ position: 'fixed', bottom: 16, left: 16, zIndex: '10' }} />
        </>
      );

  return (
    <>
      {!pathname.includes('auth')
        ? homeComponent
        : null
      }
      {children}
      <Copyright />
    </>
  );
}
