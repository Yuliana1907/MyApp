import { Navigate, Outlet } from 'react-router-dom'
import { routes } from './config.routes'

const PrivateRoutes = () => {
  return localStorage.getItem('token') ? <Outlet /> : <Navigate to={routes.login} />
}

export default PrivateRoutes
