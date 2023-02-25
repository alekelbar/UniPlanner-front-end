import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FloatButton } from '../FloatButton';
import { Navbar } from './navbar';
import { SideBar } from './SideBar';

interface LayoutProps {
  children: React.ReactNode;
}

export function LayoutComponent ({ children }: LayoutProps): JSX.Element {
  const { pathname } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {!pathname.includes('auth')
        ? (
          <>
            <Navbar onOpen={onOpen} />
            <SideBar onClose={onClose} open={open} />
            <FloatButton
              onAction={() => { router.back(); }}
              icon={<ArrowBack />}
              sxProps={{ position: 'fixed', bottom: 16, left: 16, zIndex: '10' }} />
          </>
        )
        : null
      }
      {children}
    </>
  );
}
