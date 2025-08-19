import { API_ENDPOINTS } from "../../../config/api";
import type {
  loginOrRegisterPayload,
  loginOrRegisterResponse,
} from "../../../interfaces/auth/loginOrRegister";
import apiClient from "../clients/apiClient";

export async function loginOrRegisterUser(
  payload: loginOrRegisterPayload
): Promise<loginOrRegisterResponse> {
  try {
    const response = await apiClient.post<loginOrRegisterResponse>(
      API_ENDPOINTS.AUTH.LOGIN_OR_REGISTER,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
}
