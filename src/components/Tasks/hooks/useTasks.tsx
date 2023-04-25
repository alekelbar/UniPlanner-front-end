import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import isInteger from '../../../../src/helpers/isInteger';
import usePagination from '../../../hooks/usePagination';
import { RESPONSES } from '../../../../src/interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../../../src/redux';
import { startLoadTasks } from '../../../../src/redux/thunks/tasks-thunks';

export const useTasks = () => {

  const { query: { deliveryId } } = useRouter();
  const dispatch = useAppDispatch();

  const { selected: selectedDelivery } = useAppSelector(st => st.deliveries);
  const { tasks, count, loading } = useAppSelector(st => st.tasks);

  const {
    actualPage,
    handleChangePage,
    totalPages,
    setTotalPages,
  } = usePagination(count);

  // Manejo de estado de los modales...
  const [openCreate, setOpenCreate] = useState(false);

  // timer
  const [openClock, setOpenClock] = useState(false);

  const handleCloseClock = () => {
    setOpenClock(false);
  };

  const handleOpenClock = () => {
    setOpenClock(true);
  };

  const onOpenCreate = () => {
    setOpenCreate(true);
  };

  const onCloseCreate = () => {
    setOpenCreate(false);
  };

  const [openEdit, setOpenEdit] = useState(false);

  const onOpenEdit = () => {
    setOpenEdit(true);
  };

  const onCloseEdit = () => {
    setOpenEdit(false);
  };

  const reload = async (page: number = 1) => {
    if (selectedDelivery) {
      const response = await dispatch(startLoadTasks(deliveryId as string, page));
      if (response !== RESPONSES.SUCCESS) {
        await Swal.fire(response);
      }
    }
  };

  useEffect(() => {
    reload(actualPage);
  }, [actualPage]);


  useEffect(() => {

    if (tasks.length > 5) {
      reload(actualPage);
    }

    if (tasks.length === 0 && actualPage > 1) {
      reload(actualPage - 1);
    }
    // Cálculo para la paginación
    const pages: number =
      isInteger(count / 5)
        ? count / 5
        : Math.floor(count / 5) + 1;

    setTotalPages(pages);

  }, [tasks]);

  return {
    tasksState: {
      tasks,
      reload,
      loading,
      selectedDelivery
    },
    pagination: {
      actualPage,
      handleChangePage,
      totalPages
    },
    dialogHandler: {
      openClock,
      openCreate,
      openEdit,
      onCloseCreate,
      onCloseEdit,
      onOpenCreate,
      onOpenEdit,
      handleCloseClock,
      handleOpenClock
    }
  };

};
