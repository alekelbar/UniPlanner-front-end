import React from 'react';
import { SideBar } from '../SideBar';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Navbar } from './navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {

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
};
