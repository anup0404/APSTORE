import { API_ENDPOINTS } from "../../../config/api";
import type { PaginatedResponse } from "../../../types/api.type";
import type {
  HomeCategory,
  HomeProduct,
  HomeVideo,
} from "../../../types/home.type";
import apiClient, { type ApiResponse } from "../clients/apiClient";

export const getHomeProducts = async (
  page = 1,
  size = 10
): Promise<PaginatedResponse<HomeProduct>> => {
  try {
    const response = await apiClient.get<
      ApiResponse<PaginatedResponse<HomeProduct>>
    >(`${API_ENDPOINTS.HOME.FEATURED_PRODUCTS}?page=${page}&size=${size}`);

    const paginatedData = response.data.data;
    console.log("Fetched home products:", paginatedData);

    return {
      items: paginatedData.items,
      total: paginatedData.total,
      page: paginatedData.page,
      size: paginatedData.size,
      pages: paginatedData.pages,
      has_next: paginatedData.has_next,
      has_prev: paginatedData.has_prev,
    };
  } catch (error) {
    console.error("Error fetching home products:", error);
    throw error;
  }
};

export const getHomeCategory = async (): Promise<HomeCategory[]> => {
  try {
    const response = await apiClient.get<ApiResponse<HomeCategory[]>>(
      API_ENDPOINTS.HOME.CATEGORIES
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching home categories:", error);
    throw error;
  }
};

export const getHomeVideos = async (): Promise<HomeVideo[]> => {
  try {
    const response = await apiClient.get<ApiResponse<HomeVideo[]>>(
      API_ENDPOINTS.HOME.VIDEOS
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching home videos:", error);
    throw error;
  }
};
