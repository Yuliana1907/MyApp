import { Navigate, Outlet } from 'react-router-dom'
import { routes } from './config.routes'

const PublicRoutes = () => {
  return !localStorage.getItem('token') ? <Outlet /> : <Navigate to={routes.login} />
}

export default PublicRoutes
