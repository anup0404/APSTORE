import type { PaginatedResponse } from "../../types/api.type";
import type {
  HomeCategory,
  HomeProduct,
  HomeVideo,
} from "../../types/home.type";
import { baseApi } from "./baseApi";

export const HomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeProduct: builder.query<
      PaginatedResponse<HomeProduct>,
      { page?: number; size?: number }
    >({
      query: ({ page = 1, size = 10 }) => ({
        url: "/home/featured-products",
        method: "get",
        params: { page, size },
      }),
      transformResponse: (response: {
        data: PaginatedResponse<HomeProduct>;
      }): PaginatedResponse<HomeProduct> => {
        const paginatedData = response.data;
        return {
          items: paginatedData.items,
          total: paginatedData.total,
          page: paginatedData.page,
          size: paginatedData.size,
          pages: paginatedData.pages,
          has_next: paginatedData.has_next,
          has_prev: paginatedData.has_prev,
        };
      },
    }),

    getHomeCategory: builder.query<HomeCategory[], void>({
      query: () => ({ url: "/home/categories", method: "get" }),
      transformResponse: (response: {
        data: HomeCategory[];
      }): HomeCategory[] => {
        return response.data;
      },
    }),
    getHomeVideos: builder.query<HomeVideo[] | undefined, void>({
      query: () => ({ url: "/home/hero-section/videos", method: "get" }),
      transformResponse: (response: { data: HomeVideo[] }): HomeVideo[] => {
        return response.data;
      },
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetHomeProductQuery,
  useGetHomeCategoryQuery,
  useGetHomeVideosQuery,
} = HomeApi;
