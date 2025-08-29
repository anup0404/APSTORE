import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { AxiosRequestConfig } from "axios";
import {
  apiClient,
  type ApiError,
  type ApiResponse,
} from "../../services/api/clients/apiClient";

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: "get" | "post" | "put" | "delete";
      data?: unknown;
      params?: unknown;
      config?: AxiosRequestConfig;
    },
    unknown,
    ApiError
  > =>
  async ({ url, method, data, params, config }) => {
    try {
      let response: ApiResponse;

      switch (method) {
        case "get":
          response = await apiClient.get(url, { ...config, params });
          break;
        case "post":
          response = await apiClient.post(url, data, config);
          break;
        case "put":
          response = await apiClient.put(url, data, config);
          break;
        case "delete":
          response = await apiClient.delete(url, { ...config, data });
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      return { data: response.data };
    } catch (error: unknown) {
      return { error: error as ApiError };
    }
  };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
