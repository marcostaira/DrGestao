import api from "@/lib/api";
import {
  Usuario,
  CreateUsuarioData,
  UpdateUsuarioData,
  ApiResponse,
} from "@/types";

export async function getUsers(): Promise<Usuario[]> {
  const response = await api.get<ApiResponse<Usuario[]>>("/usuarios");
  return response.data.data || [];
}

export async function getUserById(id: string): Promise<Usuario> {
  const response = await api.get<ApiResponse<Usuario>>(`/usuarios/${id}`);
  return response.data.data!;
}

export async function createUser(data: CreateUsuarioData): Promise<Usuario> {
  const response = await api.post<ApiResponse<Usuario>>("/usuarios", data);
  return response.data.data!;
}

export async function updateUser(
  id: string,
  data: UpdateUsuarioData
): Promise<Usuario> {
  const response = await api.put<ApiResponse<Usuario>>(`/usuarios/${id}`, data);
  return response.data.data!;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/usuarios/${id}`);
}

export async function toggleUserStatus(
  id: string,
  ativo: boolean
): Promise<Usuario> {
  const response = await api.patch<ApiResponse<Usuario>>(
    `/usuarios/${id}/status`,
    { ativo }
  );
  return response.data.data!;
}
