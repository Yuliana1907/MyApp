import { Outlet } from 'react-router-dom'
import { Header } from 'src/_molecules'

export const HeaderContent = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
