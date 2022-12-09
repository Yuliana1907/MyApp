import { FormInstance } from 'antd'
import { TDate, TTasksList } from 'src/common/types'
import { Dispatch, SetStateAction } from 'react'

export type TForm = {
  className?: string
  open?: boolean
  handleCancel?: () => void
  form: FormInstance
  onFinish?: (values: TTasksList) => void
  setDate?: Dispatch<SetStateAction<TDate>>
}
