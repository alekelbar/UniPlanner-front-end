import axios from "axios";

export const validateToken = async (token: string | null) => {
  if (token) {
    try {
      await axios.get("http://localhost:3000/api/v1/auth/validate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {}
  }
  return false;
};
