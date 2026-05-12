export type UserProfile = {
  id: string
  email: string
  firstName: string
  lastName: string
  login_method: string
  status: string
  is_hintro_admin: boolean
  createdAt: string
  updatedAt: string
}

export type DashboardResponse = {
  user: UserProfile
  subscription: {
    plan: string
    billing_cycle: string
    status: string
  } | null
  usage: {
    kb_files: { used: number; limit: number; percentage: number }
    vocab_terms: number
    notes: number
  }
}

export type CallStatsResponse = {
  totalSessions: number
  averageDuration: number
  totalAIInteractions: number
  lastSession: string[]
}

export type CallSession = {
  _id: string
  user_id: string
  status: string
  client: string
  description: string
  started_at: string
  ended_at: string
  total_duration_seconds: number
  ai_interactions: number
  participants: { name: string; isUser: boolean }[]
}

export type CallSessionsListResponse = {
  callSessions: CallSession[]
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}
