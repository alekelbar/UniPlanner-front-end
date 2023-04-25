import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux';
import usePagination from '../../../hooks/usePagination';
import isInteger from '../../../helpers/isInteger';
import { startLoadSession } from '../../../redux/thunks/session-thunks';
import { RESPONSES } from '../../../interfaces/response-messages';
import Swal from 'sweetalert2';

export const useSession = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { query: { user } } = router;

  const { sessions = [], count, loading, selected } = useAppSelector(state => state.sessions);

  const {
    actualPage,
    handleChangePage,
    totalPages,
    setTotalPages,
  } = usePagination(count);

  const [openClock, setOpenClock] = useState(false);

  const onOpenClock = () => {
    setOpenClock(true);
  };

  const onCloseClock = () => {
    setOpenClock(false);
  };

  const [openCreate, setOpenCreate] = useState(false);

  const onOpenCreate = () => {
    setOpenCreate(true);
  };

  const onCloseCreate = () => {
    setOpenCreate(false);
  };

  const reload = async (page: number = 1) => {
    if (user) {
      const response = await dispatch(startLoadSession(user as string, page));
      if (response !== RESPONSES.SUCCESS)
        await Swal.fire(response);
    }
  };

  useEffect(() => {
    reload(actualPage);
  }, [actualPage]);

  useEffect(() => {

    if (sessions.length === 0 && actualPage > 1) {
      reload(actualPage - 1);
    }

    if (sessions.length > 5) {
      reload(actualPage);
    }

    // Cálculo para la paginación
    const pages: number =
      isInteger(count / 5)
        ? count / 5
        : Math.floor(count / 5) + 1;

    setTotalPages(pages);

  }, [sessions]);

  return {
    sessionState: {
      loading,
      selected,
      sessions,
      reload,
    },
    clock: {
      openClock, onOpenClock, onCloseClock
    },
    pagination: {
      handleChangePage, totalPages, actualPage
    },
    dialogHandler: {
      openCreate, onOpenCreate, onCloseCreate
    },
    theming: {
      theme
    }
  };

};
