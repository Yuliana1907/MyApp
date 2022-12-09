import { TableProps } from 'antd'
import { SortOrder } from 'antd/es/table/interface'
import { TTasksList } from 'src/common/types'

export type TTable = TableProps & {
  onChangePage: (data: number) => void
  pageSize: number
}

export type TTasksTableRequestData = {
  sortField?: keyof TTasksList
  sortOrder?: SortOrder
  page?: TPageInfo
}

export type TPageInfo = {
  pageNumber: number
  pageSize: number
}
