import { Add } from '@mui/icons-material';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Loading } from '../../../../src/components';
import AddDeliveryDialog from '../../../../src/components/Deliverables/AddDeliveryDialog';
import { DeliveryCard } from '../../../../src/components/Deliverables/DeliveryCard';
import EditDeliverableDialog from '../../../../src/components/Deliverables/EditDeliverableDialog';
import { FloatButton } from '../../../../src/components/common/FloatButton';
import isInteger from '../../../../src/helpers/isInteger';
import { isValidToken } from '../../../../src/helpers/isValidToken';
import usePagination from '../../../hooks/usePagination';
import { RESPONSES } from '../../../../src/interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../../../src/redux';
import { startLoadDeliveries } from '../../../../src/redux/thunks/deliverables-thunks';
import { priorityCalc } from '../../Career/helpers/priorityCalc';
import { useRouter } from 'next/router';


export const useDeliveries = () => {
  const dispatch = useAppDispatch();

  const { query: { courseId } } = useRouter();

  const { deliverables, count, loading } = useAppSelector(st => st.deliveries);

  const {
    actualPage,
    handleChangePage,
    totalPages,
    setTotalPages,
  } = usePagination(count);

  // Manejo de estado de los modales...
  const [openCreate, setOpenCreate] = useState(false);

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
    const response = await dispatch(startLoadDeliveries(courseId as string, page));
    if (response !== RESPONSES.SUCCESS) {
      await Swal.fire(response);
    }
  };

  useEffect(() => {
    reload(actualPage);
  }, [actualPage]);

  useEffect(() => {
    if (deliverables.length === 0 && actualPage > 1) {
      reload(actualPage - 1);
    }

    if (deliverables.length > 5) {
      reload(actualPage);
    }

    // Cálculo para la paginación
    const pages: number =
      isInteger(count / 5)
        ? count / 5
        : Math.floor(count / 5) + 1;

    setTotalPages(pages);

  }, [deliverables]);

  return {
    deliveriesState: {
      deliverables,
      loading,
      reload
    },
    pagination: {
      actualPage,
      handleChangePage,
      totalPages,
    },
    dialogHandler: {
      openCreate,
      openEdit,
      onCloseCreate,
      onOpenCreate,
      onCloseEdit,
      onOpenEdit
    }
  };
};
