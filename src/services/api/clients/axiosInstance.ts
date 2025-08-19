import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  AxiosHeaders,
} from "axios";
import API_CONFIG from "./apiConfig";
import { getToken } from "../../../utils/token";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: API_CONFIG.headers,
  withCredentials: API_CONFIG.withCredentials,
  timeout: API_CONFIG.timeout,
});

// Request interceptor - add auth token if present
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getToken();

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error: unknown) => {
    // Return rejected promise with error typed as unknown
    return Promise.reject(error);
  }
);

// Response interceptor - handle token expiry (401)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
