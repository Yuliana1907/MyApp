import { ColumnsType } from 'antd/es/table'
import { Dropdown } from 'antd'
import { TTasksList } from 'src/common/types'
import { ReactComponent as More } from 'src/assets/svg/More.svg'
import { ASSIGNED, STATUSES } from 'src/contsnts/commonConstants'
import './styles.scss'
import { modifiedDate } from 'src/contsnts/utils'
import { TTableConstants } from 'src/contsnts/types'

export const columns = ({ showMenu }: TTableConstants): ColumnsType<TTasksList> => [
  {
    dataIndex: 'task_name',
    key: 'task_name',
    title: 'Task name',
    render: (_, { task_name }) => <div>{task_name}</div>,
    filterSearch: true,
    sorter: true,
    showSorterTooltip: false
  },
  {
    dataIndex: 'assigned_type',
    key: 'assigned_type',
    title: 'Assigned type',
    render: (_, { assigned_type }) => (
      <div className="table-constants__assigned-type">
        {ASSIGNED[assigned_type]?.split(' ').map((i) => `${i[0]}`)}
      </div>
    ),
    filterSearch: true,
    sorter: true,
    showSorterTooltip: false
  },
  {
    dataIndex: 'created_date',
    key: 'created_date',
    title: 'Created date',
    render: (_, { created_date }) => <div>{modifiedDate(created_date)}</div>,
    filterSearch: true,
    sorter: true,
    showSorterTooltip: false
  },
  {
    dataIndex: 'last_modified',
    key: 'last_modified',
    title: 'Last modified',
    render: (_, { last_modified }) => <div>{modifiedDate(last_modified)}</div>,
    filterSearch: true,
    sorter: true,
    showSorterTooltip: false
  },
  {
    dataIndex: 'statuses_type',
    key: 'statuses_type',
    title: 'Statuses',
    render: (_, { statuses_type }) => <div>{STATUSES[statuses_type]}</div>,
    filterSearch: true,
    sorter: true,
    showSorterTooltip: false
  },
  {
    key: 'action',
    render: (_, record) => (
      <Dropdown overlay={showMenu(record)}>
        <More />
      </Dropdown>
    )
  }
]
