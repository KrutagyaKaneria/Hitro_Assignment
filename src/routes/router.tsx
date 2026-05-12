import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AuthLayout } from '@/layouts/AuthLayout'
import { LoginPage } from '@/pages/LoginPage'
import { PlaceholderHomePage } from '@/pages/PlaceholderHomePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PlaceholderHomePage />,
  },
  {
    path: '/login',
    element: (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
