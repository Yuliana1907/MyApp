import { RangePicker, Select } from '../index'
import { DatePickerProps, Form } from 'antd'
import './form.filters.scss'
import { ASSIGNED, STATUSES } from 'src/contsnts/commonConstants'
import { RangePickerProps } from 'antd/es/date-picker'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { getStatuses } from 'src/redux/statuses/selectors'
import { getAssigners } from 'src/redux/assigners/selectors'
import { useEffect } from 'react'
import { requestAssigners } from 'src/redux/assigners/actions'
import { requestStatuses } from 'src/redux/statuses/actions'
import { TForm } from 'src/_atoms/Form/FormType'

export const Filters = ({ setDate, form }: TForm) => {
  const dispatch = useAppDispatch()

  const { statuses } = useAppSelector(getStatuses)
  const { assigners } = useAppSelector(getAssigners)

  useEffect(() => {
    dispatch(requestAssigners())
    dispatch(requestStatuses())
  }, [])

  const onRangePickerChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string
  ) => {
    setDate && setDate({ created_date: dateString[0], last_modified: dateString[1] })
  }

  return (
    <Form form={form} className="filters">
      <RangePicker
        className="filters__range-picker"
        propsItem={{ name: 'date' }}
        propsDataPicker={{ onChange: onRangePickerChange }}
      />
      <Select
        className="filters__statuses-select"
        propsItem={{ name: 'statuses_type' }}
        propsSelect={{
          placeholder: 'All statuses',
          options: statuses.map((status) => ({
            value: status.name,
            label: STATUSES[status.name]
          }))
        }}
      />
      <Select
        className="filters__assigners-select"
        propsItem={{ name: 'assigned_type' }}
        propsSelect={{
          placeholder: 'All assigners',
          options: assigners.map((assigner) => ({
            value: assigner.name,
            label: ASSIGNED[assigner.name]
          }))
        }}
      />
    </Form>
  )
}
