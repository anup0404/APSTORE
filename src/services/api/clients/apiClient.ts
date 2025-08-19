import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface ErrorResponseData {
  message?: string;
  errors?: Record<string, string[]>;
}

class ApiClient {
  async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await axiosInstance.get(url, config);
      return {
        data: response.data,
        message: response.data?.message,
        success: true,
        status: response.status,
      };
    } catch (error: unknown) {
      throw this.formatError(error);
    }
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        url,
        data,
        config
      );
      return {
        data: response.data,
        message: response.data?.message,
        success: true,
        status: response.status,
      };
    } catch (error: unknown) {
      throw this.formatError(error);
    }
  }

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        url,
        data,
        config
      );
      return {
        data: response.data,
        message: response.data?.message,
        success: true,
        status: response.status,
      };
    } catch (error: unknown) {
      throw this.formatError(error);
    }
  }

  async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await axiosInstance.delete(url, config);
      return {
        data: response.data,
        message: response.data?.message,
        success: true,
        status: response.status,
      };
    } catch (error: unknown) {
      throw this.formatError(error);
    }
  }

  private formatError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data as
        | ErrorResponseData
        | undefined;

      return {
        message:
          responseData?.message ||
          error.message ||
          "An unexpected error occurred",
        status: error.response?.status || 500,
        errors: responseData?.errors,
      };
    }
    return {
      message: "An unexpected error occurred",
      status: 500,
    };
  }

  // // File upload method
  //   async uploadFile<T = any>(url: string, file: File, onUploadProgress?: (progressEvent: any) => void): Promise<ApiResponse<T>> {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     try {
  //       const response = await this.client.post(url, formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //         onUploadProgress,
  //       });
  //       return {
  //         data: response.data,
  //         message: response.data?.message,
  //         success: true,
  //         status: response.status,
  //       };
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
}

export const apiClient = new ApiClient();
export default apiClient;
