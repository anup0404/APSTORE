import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { AxiosRequestConfig } from "axios";
import {
  apiClient,
  type ApiError,
  type ApiResponse,
} from "../../services/api/clients/apiClient";

// Define the argument type more explicitly
interface BaseQueryArgs {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: unknown; // Use 'any' instead of 'unknown' to avoid serialization issues
  params?: unknown;
  config?: AxiosRequestConfig;
}

const axiosBaseQuery =
  (): BaseQueryFn<BaseQueryArgs, unknown, ApiError> => async (args) => {
    // Destructure with default values to avoid undefined issues
    const { url, method, data, params, config } = args;

    console.log("🔥 BaseQuery called with:", {
      url,
      method,
      data,
      params,
      config,
    });
    console.log("🔍 Data type:", typeof data, "Data value:", data);

    try {
      let response: ApiResponse;

      switch (method) {
        case "get":
          console.log("📤 Making GET request to:", url, "with params:", params);
          response = await apiClient.get(url, { ...config, params });
          break;
        case "post":
          console.log("📤 Making POST request to:", url, "with data:", data);
          response = await apiClient.post(url, data, config);
          break;
        case "put":
          console.log("📤 Making PUT request to:", url, "with data:", data);
          response = await apiClient.put(url, data, config);
          break;
        case "delete":
          console.log("📤 Making DELETE request to:", url, "with data:", data);
          response = await apiClient.delete(url, { ...config, data });
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      console.log("✅ Response received:", response);
      return { data: response.data };
    } catch (error: unknown) {
      console.error("❌ Request failed:", error);
      return { error: error as ApiError };
    }
  };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
