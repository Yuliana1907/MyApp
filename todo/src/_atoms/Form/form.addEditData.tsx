import { Input, Button, Select } from '../index'
import { Divider, Form, Modal } from 'antd'
import cn from 'classnames'
import './form.login.scss'
import { useEffect } from 'react'
import { requestAssigners } from 'src/redux/assigners/actions'
import { requestStatuses } from 'src/redux/statuses/actions'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { getStatuses } from 'src/redux/statuses/selectors'
import { getAssigners } from 'src/redux/assigners/selectors'
import { ASSIGNED, STATUSES } from 'src/contsnts/commonConstants'
import { TForm } from 'src/_atoms/Form/FormType'

export const AddEdit = ({ className, open, handleCancel, form, onFinish }: TForm) => {
  const dispatch = useAppDispatch()
  const { statuses } = useAppSelector(getStatuses)
  const { assigners } = useAppSelector(getAssigners)
  useEffect(() => {
    dispatch(requestAssigners())
    dispatch(requestStatuses())
  }, [])
  return (
    <Modal
      footer={[
        <Divider />,
        <Button.Default variant="secondary" key="back" onClick={handleCancel}>
          Cancel
        </Button.Default>,
        <Button.Default variant="primary" key="submit" type="primary" onClick={form.submit}>
          Save
        </Button.Default>
      ]}
      onOk={form.submit}
      onCancel={handleCancel}
      title="Create/Edit"
      open={open}
    >
      <Form id="form" form={form} onFinish={onFinish} className={cn('form-sign-up', className)}>
        <Input.Default
          propsInput={{
            disabled: true
          }}
          propsItem={{
            label: 'Protocol ID',
            name: 'id'
          }}
        />
        <Input.Default
          propsInput={{
            placeholder: 'Input task name'
          }}
          propsItem={{
            label: 'Task  name',
            name: 'task_name',
            rules: [{ required: true, message: 'Please input your task name' }]
          }}
        />
        <Select
          propsSelect={{
            placeholder: 'Select assigner',
            options: assigners.map((assigner) => ({
              value: assigner.name,
              label: ASSIGNED[assigner.name]
            }))
          }}
          propsItem={{
            label: 'Assigned by',
            name: 'assigned_type',
            rules: [{ required: true, message: 'Please select assigner' }]
          }}
        />
        <Select
          propsSelect={{
            placeholder: 'Select status',
            options: statuses.map((status) => ({
              value: status.name,
              label: STATUSES[status.name]
            }))
          }}
          propsItem={{
            label: 'Status',
            name: 'statuses_type',
            rules: [{ required: true, message: 'Please select status' }]
          }}
        />
      </Form>
    </Modal>
  )
}
