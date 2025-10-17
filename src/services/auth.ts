import api from "./api"
import type { LoginRequest, LoginResponse, User } from "@/types/api"

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/accounts/login/", credentials)
    return data
  },

  logout: async (): Promise<void> => {
    await api.post("/accounts/logout/")
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<User>("/accounts/profile/")
    return data
  },

  updateProfile: async (userId: number, updates: Partial<User>): Promise<User> => {
    const { data } = await api.put<User>(`/accounts/users/${userId}/`, updates)
    return data
  },
}
