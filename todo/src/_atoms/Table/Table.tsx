import { Table as TableDefault } from 'antd'
import cn from 'classnames'
import './styles.scss'
import { TTable } from './TableType'

export const Table = ({ className, pagination, ...props }: TTable): JSX.Element => (
  <TableDefault
    className={cn('default-table', className)}
    tableLayout="auto"
    pagination={{
      ...pagination,
      showSizeChanger: false,
      showTotal: (total, range) => `Displayed ${range[0]}-${range[1]} out of ${total}`
    }}
    {...props}
  />
)
