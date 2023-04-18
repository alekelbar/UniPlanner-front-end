import axios from "axios";
import { API_URL } from "../api-service";

export const validateToken = async (token: string | null) => {
  if (token) {
    try {
      const response = await axios.get<{ ok: boolean }>(
        `${API_URL}auth/validate/${token}`
      );

      return response.data.ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return false;
};
