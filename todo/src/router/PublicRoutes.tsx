import { Navigate, Outlet } from 'react-router-dom'
import { URL } from 'src/contsnts/commonConstants'
import { routes } from './config.routes'

const PublicRoutes = () => {
  if (window.location.href.split('/')[3] === URL.LOGIN) {
    localStorage.clear()
  }
  return !localStorage.getItem('token') ? <Outlet /> : <Navigate to={routes.login} />
}

export default PublicRoutes
