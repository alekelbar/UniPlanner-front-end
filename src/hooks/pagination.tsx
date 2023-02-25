import { useState } from 'react';

export default function usePagination (limit: number, page: number = 1) {
  const [actualPage, setActualPage] = useState<number>(page);
  const [totalPages, setTotalPages] = useState<number>(limit);


  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setActualPage(value);
  };

  return {
    actualPage,
    handleChangePage,
    totalPages,
    setTotalPages
  };

}
