import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { STORAGE_KEYS } from '@/constants/storageKeys'
import type { UserId } from '@/types/user'

type AuthState = {
  userId: UserId | null
  setUserId: (id: UserId) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      setUserId: (userId) => set({ userId }),
      clearAuth: () => set({ userId: null }),
    }),
    {
      name: STORAGE_KEYS.auth,
      partialize: (s) => ({ userId: s.userId }),
    },
  ),
)
