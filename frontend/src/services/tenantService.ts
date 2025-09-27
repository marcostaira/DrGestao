import api from "@/lib/api";
import { Tenant, UpdateTenantData, ApiResponse } from "@/types";

export async function getTenant(): Promise<Tenant> {
  const response = await api.get<ApiResponse<Tenant>>("/tenants/me");
  return response.data.data!;
}

export async function updateTenant(data: UpdateTenantData): Promise<Tenant> {
  const response = await api.put<ApiResponse<Tenant>>("/tenants/me", data);
  return response.data.data!;
}
