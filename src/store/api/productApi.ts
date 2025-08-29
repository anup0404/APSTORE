import type { HomeProduct } from "../../types/home.type";
import type { Product } from "../../types/product.type";
import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<HomeProduct[], void>({
      query: () => ({ url: "/products", method: "get" }),
    }),

    getProductById: builder.query<Product, string>({
      query: (productId) => ({ url: `/products/${productId}`, method: "get" }),
      transformResponse: (response: { data: Product }): Product => {
        return response.data;
      },
    }),
    // createProduct: builder.mutation<Product, Partial<Product>>({
    //   query: (newProduct) => ({
    //     url: "/products",
    //     method: "post",
    //     data: newProduct,
    //   }),
    // }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  //   useCreateProductMutation,
} = productApi;
