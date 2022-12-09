import { Navigate, Outlet } from 'react-router-dom'
import { routes } from './config.routes'

const PrivateRoutes = () => {
  const isAuthenticated = localStorage.getItem('token')
  return isAuthenticated ? <Outlet /> : <Navigate to={routes.login} />
}

export default PrivateRoutes
