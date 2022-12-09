import { Form, Input } from 'antd'
import './input.default.scss'
import classNames from 'classnames'
import { TInput } from './InputType'

export const Default = ({ propsInput, propsItem, className }: TInput) => {
  return (
    <Form.Item colon={false} {...propsItem} className={classNames('default-input', className)}>
      <Input {...propsInput} />
    </Form.Item>
  )
}
