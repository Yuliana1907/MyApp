import { Form, DatePicker as RangePickerDefault } from 'antd'
import { TRangePicker } from './RangePickerType'
import cn from 'classnames'
import './styles.scss'

export const RangePicker = ({ propsItem, propsDataPicker, className }: TRangePicker) => {
  return (
    <Form.Item className={cn('default-range-picker', className)} {...propsItem}>
      <RangePickerDefault.RangePicker showArrow {...propsDataPicker} />
    </Form.Item>
  )
}
