import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, TasksPage } from 'src/_pages'
import { routes } from './/config.routes'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import { HeaderContent } from 'src/router/HeaderContent'
import { URL } from 'src/contsnts/commonConstants'

export const AppRoutes = () => {
  if (window.location.href.split('/')[3] === URL.LOGIN) {
    localStorage.clear()
  }
  return (
    <Routes>
      <Route path={routes.default} element={<PublicRoutes />}>
        <Route path={routes.default} element={<Navigate to={routes.login} />} />
        <Route path={routes.login} element={<LoginPage />} />
      </Route>
      <Route path={routes.default} element={<PrivateRoutes />}>
        <Route path={routes.default} element={<HeaderContent />}>
          <Route path={routes.default} element={<Navigate to={routes.tasks} />} />
          <Route path={routes.tasks} element={<TasksPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
