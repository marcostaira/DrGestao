import api from "@/lib/api";
import { LoginCredentials, AuthResponse } from "@/types";

export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  const response = await api.post("/auth/login", credentials);
  return response.data.data;
}

export async function refreshToken(
  refreshToken: string
): Promise<{ token: string }> {
  const response = await api.post("/auth/refresh", { refreshToken });
  return response.data.data;
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  await api.post("/auth/change-password", {
    currentPassword,
    newPassword,
  });
}
