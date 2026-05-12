import { apiClient } from '@/api/client'
import type { DashboardResponse, UserProfile } from '@/types/api'

export async function fetchAuthProfile(): Promise<UserProfile> {
  const { data } = await apiClient.get<UserProfile>('/api/auth/profile')
  return data
}

export async function fetchAuthDashboard(): Promise<DashboardResponse> {
  const { data } = await apiClient.get<DashboardResponse>('/api/auth/dashboard')
  return data
}
