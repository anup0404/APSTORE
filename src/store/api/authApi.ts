import { API_ENDPOINTS } from "../../config/api";
import type {
  loginOrRegisterPayload,
  loginOrRegisterResponse,
} from "../../interfaces/auth/loginOrRegister";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginOrRegister: builder.mutation<
      loginOrRegisterResponse,
      loginOrRegisterPayload
    >({
      query: (payload: loginOrRegisterPayload) => {
        console.log("🚀 AuthAPI query function called with payload:", payload);

        const queryConfig = {
          url: API_ENDPOINTS.AUTH.LOGIN_OR_REGISTER,
          method: "post" as const,
          data: payload, // Use 'data' for Axios-based baseQuery
        };

        console.log("🔧 Query config:", queryConfig);
        return queryConfig;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginOrRegisterMutation } = authApi;
