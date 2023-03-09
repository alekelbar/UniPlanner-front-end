import axios from "axios";
import { API_URL } from "../api-version";

export const validateToken = async (token: string | null) => {
  if (token) {
    try {
      await axios.get(
        `${API_URL}auth/validate`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch (error) {}
  }
  return false;
};
