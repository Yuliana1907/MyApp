import './styles.scss'
import { Form } from 'src/_atoms'
import { ReactComponent as Logo } from 'src/assets/svg/Logo.svg'

export const Login = () => {
  return (
    <div className="login__container">
      <div className="login__form-container">
        <div className="login__title">Lirene</div>
        <Form.SignUp />
        <div className="login__subtitle">Build version 1.1.0</div>
      </div>
      <div className="login__logo-wrapper">
        <Logo />
        <div className="login__logo">LTC Corporation</div>
      </div>
    </div>
  )
}
