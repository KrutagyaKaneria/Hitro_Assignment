import { useQuery } from '@tanstack/react-query'

import { fetchAuthDashboard, fetchAuthProfile } from '@/api/auth'
import { fetchCallSessions, fetchCallStats } from '@/api/callSessions'
import { queryKeys } from '@/constants/queryKeys'

export function useDashboardQueries(enabled: boolean) {
  const profile = useQuery({
    queryKey: queryKeys.profile,
    queryFn: fetchAuthProfile,
    enabled,
  })

  const dashboard = useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: fetchAuthDashboard,
    enabled,
  })

  const stats = useQuery({
    queryKey: queryKeys.callStats,
    queryFn: fetchCallStats,
    enabled,
  })

  const sessions = useQuery({
    queryKey: queryKeys.callSessions(10),
    queryFn: () => fetchCallSessions(10),
    enabled,
  })

  const refetchAll = () => {
    void profile.refetch()
    void dashboard.refetch()
    void stats.refetch()
    void sessions.refetch()
  }

  const isLoading =
    profile.isPending ||
    dashboard.isPending ||
    stats.isPending ||
    sessions.isPending

  const isError =
    profile.isError ||
    dashboard.isError ||
    stats.isError ||
    sessions.isError

  return {
    profile,
    dashboard,
    stats,
    sessions,
    isLoading,
    isError,
    refetchAll,
  }
}
