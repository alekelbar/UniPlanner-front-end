import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Navbar } from './navbar';
import { SideBar } from './SideBar';

interface LayoutProps {
  children: React.ReactNode;
}

export function LayoutComponent ({ children }: LayoutProps): JSX.Element {
  const { pathname } = useRouter();
  const [open, setOpen] = useState<boolean>(false);

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
          </>
        )
        : null
      }
      {children}
    </>
  );
}
