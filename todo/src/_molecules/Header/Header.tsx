import './styles.scss'
import { ReactComponent as Logout } from 'src/assets/svg/Logout.svg'
import { ReactComponent as User } from 'src/assets/svg/User.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { Tabs } from 'antd'
import { TABS } from 'src/contsnts/commonConstants'
import { routes } from 'src/router/config.routes'

export const { TabPane } = Tabs

export const Header = () => {
  const navigate = useNavigate()
  const logOut = () => {
    navigate(routes.login)
    localStorage.clear()
  }
  const renderTabs = () =>
    TABS.map((tab) => (
      <NavLink className="header__link" to={tab.hrefTo} key={tab.key}>
        {tab.label}
      </NavLink>
    ))
  const email = localStorage.getItem('email')
  return (
    <div className="header">
      <div className="header__logo">Lirene</div>
      {renderTabs()}
      <div className="header__info">
        <div className="header__personal-info">
          <div className="header__user-logo">
            <User />
          </div>
          <div className="header__name">{email}</div>
        </div>
        <div className="header__line" />
        <div className="header__logout" onClick={logOut}>
          <Logout />
          <div className="header__logout-text">Log out</div>
        </div>
      </div>
    </div>
  )
}
