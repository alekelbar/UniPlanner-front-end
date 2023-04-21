import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { RESPONSES } from "../../interfaces/response-messages";
import { useAppDispatch, useAppSelector } from "../../redux";
import { startLoadCareers } from "../../redux/thunks/careers-thunks";

export const useCareerPage = () => {
  const router = useRouter();
  const { query } = router;

  const dispatch = useAppDispatch();
  const { careers, loading } = useAppSelector(state => state.career);

  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  useEffect(() => {
    (async () => {
      const response = await dispatch(startLoadCareers(query.user as string));
      if (response !== RESPONSES.SUCCESS)
        await Swal.fire(response);
    })();
  }, [query.user]);

  return {
    open, onOpen, onClose, careers, loading
  };
};
