import { Navigate, Outlet } from 'react-router-dom'
import { routes } from './config.routes'

const PublicRoutes = () => {
  const isAuthenticated = localStorage.getItem('token')
  return !isAuthenticated ? <Outlet /> : <Navigate to={routes.login} />
}

export default PublicRoutes
