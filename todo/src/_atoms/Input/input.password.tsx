import { Input, Form } from 'antd'
import cn from 'classnames'
import './input.password.scss'
import { TInput } from './InputType'

export const Password = ({ propsInput, propsItem, className }: TInput): JSX.Element => (
  <Form.Item colon={false} className={cn('input-password', className)} {...propsItem}>
    <Input.Password {...propsInput} />
  </Form.Item>
)
