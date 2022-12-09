import { Form, Select as DefaultSelect } from 'antd'
import { TSelect } from './SelectType'
import cn from 'classnames'
import './styles.scss'

export const Select = ({ propsItem, propsSelect, className }: TSelect) => {
  return (
    <Form.Item className={cn('default-select', className)} {...propsItem}>
      <DefaultSelect showArrow showSearch={false} {...propsSelect} />
    </Form.Item>
  )
}
