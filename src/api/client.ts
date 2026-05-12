import axios from 'axios'

import { useAuthStore } from '@/store/useAuthStore'

const baseURL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://mock-backend-hintro.vercel.app'

export const apiClient = axios.create({
  baseURL: baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const userId = useAuthStore.getState().userId
  if (userId) {
    config.headers['x-user-id'] = userId
  }
  return config
})
