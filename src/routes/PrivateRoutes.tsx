import { useAuth } from '@/utils/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoute = () => {
  const { token, usuario } = useAuth()

  if (!token || !usuario) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
