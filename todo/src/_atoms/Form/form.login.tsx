import { Input, Button } from '../index'
import { Form } from 'antd'
import './form.login.scss'
import { useNavigate } from 'react-router-dom'
import { login } from 'src/common/api'
import { routes } from 'src/router/config.routes'
import { TLoginForm } from 'src/common/types'

export const SignUp = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const handleLogin = (values: TLoginForm) => {
    login(values)
      .then((resp) => {
        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('email', resp.data.email)
        navigate(routes.tasks)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Form form={form} onFinish={handleLogin} className="form-sign-up">
      <Input.Default
        propsInput={{
          placeholder: 'Login'
        }}
        propsItem={{ label: 'Login', name: 'login' }}
      />
      <Input.Password
        propsInput={{
          placeholder: 'Password'
        }}
        propsItem={{ label: 'Password', name: 'password' }}
      />
      <Button.Default className="form-sign-up__login" variant="primary" htmlType="submit">
        Log in
      </Button.Default>
    </Form>
  )
}
