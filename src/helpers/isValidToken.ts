import { validateToken } from "../services/auth/validate-token";

export const isValidToken = async (tokenString: string) => {
  return await validateToken(tokenString);
};
