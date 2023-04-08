type AvailableVersions = "v1" | "v2";

export const API_VERSION: AvailableVersions = "v2";

// export const API_URL = `https://ge-back.onrender.com/api/${API_VERSION}/`
export const API_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000/api/${API_VERSION}/`
    : `https://ge-back.onrender.com/api/${API_VERSION}/`;

console.log(API_URL);
