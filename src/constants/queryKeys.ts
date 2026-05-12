export const queryKeys = {
  profile: ['auth', 'profile'] as const,
  dashboard: ['auth', 'dashboard'] as const,
  callStats: ['call-sessions', 'stats'] as const,
  callSessions: (limit: number) => ['call-sessions', 'list', limit] as const,
}
