import { API_BASE_URL } from "../../../config/env.config";

const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  } as Record<string, string>,
  withCredentials: true,
};

// Function to dynamically set Authorization header
export const setAuthHeader = (token: string | null): void => {
  if (token) {
    API_CONFIG.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete API_CONFIG.headers["Authorization"];
  }
};

export default API_CONFIG;
