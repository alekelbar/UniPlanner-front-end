import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { logOut } from '../../../helpers/local-storage';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { onLogOut } from '../../../redux/slices/auth/authSlice';


export const useSideBar = ({ onClose }: { onClose: () => void; }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useAppSelector(state => state.auth);

  const drawerRef = useRef<HTMLDivElement>(null);

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.clientX > 240) {
      onClose();
    }
  };

  const handleLogOut = () => {
    dispatch(onLogOut());
    logOut();
    router.push('/');
  };

  return {
    user, drawerRef, handleClose, handleLogOut, router
  };

};
