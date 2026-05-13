export const queryKeys = {
  profile: (userId: string) => ['auth', 'profile', userId] as const,
  dashboard: (userId: string) => ['auth', 'dashboard', userId] as const,
  callStats: (userId: string) => ['call-sessions', 'stats', userId] as const,
  callSessions: (userId: string, limit: number) =>
    ['call-sessions', 'list', userId, limit] as const,
}
