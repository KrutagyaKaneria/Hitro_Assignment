import { apiClient } from '@/api/client'
import type { CallSessionsListResponse, CallStatsResponse } from '@/types/api'

export async function fetchCallStats(): Promise<CallStatsResponse> {
  const { data } = await apiClient.get<CallStatsResponse>(
    '/api/call-sessions/stats',
  )
  return data
}

export async function fetchCallSessions(
  limit = 10,
): Promise<CallSessionsListResponse> {
  const { data } = await apiClient.get<CallSessionsListResponse>(
    '/api/call-sessions',
    { params: { limit } },
  )
  return data
}
