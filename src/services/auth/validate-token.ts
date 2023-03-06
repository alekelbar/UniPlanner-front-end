import axios from "axios";
import { API_VERSION } from "../api-version";

export const validateToken = async (token: string | null) => {
  if (token) {
    try {
      await axios.get(
        `http://localhost:3000/api/${API_VERSION}/auth/validate`,
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
