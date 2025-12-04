import { Navigate, useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/appStore'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAppStore()
  const location = useLocation()

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  return children
}


