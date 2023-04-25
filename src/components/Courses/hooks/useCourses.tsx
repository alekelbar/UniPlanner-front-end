import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import isInteger from '../../../../src/helpers/isInteger';
import usePagination from '../../../hooks/usePagination';
import { RESPONSES } from '../../../../src/interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../../../src/redux/hooks';
import { startLoadCourses } from '../../../../src/redux/thunks/courses.thunks';

export const useCourses = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { query: { careerName, careerId } } = router;
  const { courses, count, loading } = useAppSelector(state => state.courses);

  const {
    actualPage,
    handleChangePage,
    totalPages,
    setTotalPages,
  } = usePagination(count);

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

  const reload = async (page: number) => {
    const response = await dispatch(startLoadCourses(careerId as string, page));
    if (response !== RESPONSES.SUCCESS)
      await Swal.fire(response);
  };

  useEffect(() => {
    reload(actualPage);
  }, [actualPage]);

  useEffect(() => {
    if (courses.length === 0 && actualPage > 1) {
      reload(actualPage - 1);
    }
    if (courses.length > 5) {
      reload(actualPage);
    }
    // Cálculo para la paginación
    const pages: number =
      isInteger(count / 5)
        ? count / 5
        : Math.floor(count / 5) + 1;

    setTotalPages(pages);
  }, [courses]);

  return {
    coursesState: {
      careerName,
      courses,
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
      onCloseEdit,
      onOpenEdit,
      onOpenCreate
    }
  };
};
