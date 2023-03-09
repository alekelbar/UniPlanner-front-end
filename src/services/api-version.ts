type AvailableVersions = "v1" | "v2";

export const API_VERSION: AvailableVersions = "v2";

export const API_URL = process.env.NEXT_PUBLIC_VERCEL_ENV
  ? `https://ge-back.onrender.com/api/${API_VERSION}/`
  : `http://localhost:3000/api/${API_VERSION}/`;
