import { Input, Button } from 'src/_atoms'
import './styles.scss'
import { SetStateAction, useEffect, useState } from 'react'
import { Form as AntdForm } from 'antd'
import { useDebounce } from 'src/hooks/useDebounce'
import { Table } from 'src/_atoms/Table/Table'
import { columns } from 'src/_organisms/constants'
import { TDate, TQueryParams, TTasksList } from 'src/common/types'
import {
  addTableData,
  deleteTableDataInfo,
  requestTableDataInfo,
  updateTableDataInfo
} from 'src/common/api'
import { DEFAULT, INITIAL_DATE } from 'src/contsnts/commonConstants'
import { TTasksTableRequestData } from 'src/_atoms/Table/TableType'
import { SortOrder } from 'antd/es/table/interface'
import { addDate, generateString } from 'src/contsnts/utils'
import { Form } from 'src/_atoms'

export const Tasks = () => {
  const [tableData, setTableData] = useState<TTasksList[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [sort, setSort] = useState<TTasksTableRequestData>()
  const [pageInfo, setPageInfo] = useState({ ...DEFAULT })
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState<TTasksList[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isChange, setChange] = useState(false)
  const [date, setDate] = useState<TDate>({ ...INITIAL_DATE })
  const debouncedSearch = useDebounce(searchValue, 500)

  const [filterForm] = AntdForm.useForm()
  const [addEditForm] = AntdForm.useForm()

  const statuses_type = AntdForm.useWatch('statuses_type', filterForm)
  const assigned_type = AntdForm.useWatch('assigned_type', filterForm)

  useEffect(() => {
    getTableData({ ...sort })
  }, [debouncedSearch, statuses_type, assigned_type, date, isChange])

  const getTableData = ({ sortField, sortOrder, page }: TTasksTableRequestData) => {
    const params: TQueryParams = {}
    if (searchValue) {
      params.search = searchValue
    }
    if (sortField) {
      if (sortOrder) {
        params.ordering = sortOrder === 'descend' ? 'des' : 'asc'
        params.field = sortField
      }
      setSort({
        sortField,
        sortOrder
      })
    }
    if (statuses_type) {
      params.statuses_type = statuses_type
    }
    if (assigned_type) {
      params.assigned_type = assigned_type
    }
    if (date) {
      params.created_date = date.created_date
      params.last_modified = date.last_modified
    }
    if (
      date.created_date === INITIAL_DATE.created_date &&
      date.last_modified === INITIAL_DATE.last_modified
    ) {
      delete params.created_date
      delete params.last_modified
    }
    const dataPage = page ? page : pageInfo
    params.limit = dataPage.pageSize
    params.offset = (dataPage.pageNumber - 1) * dataPage.pageSize
    requestTableDataInfo(params).then((resp) => {
      setTableData(
        resp.data.results.map((i) => ({
          ...i,
          key: i.id
        }))
      )
      setPageCount(resp.data.count)
    })
  }

  const onSearchChangeValue = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchValue(e.target.value)
  }

  const handleTableChange = (
    pagination: { current: number; pageSize: number },
    _: any,
    sorter: { field: keyof TTasksList | undefined; order: SortOrder | undefined }
  ) => {
    const page = {
      pageNumber: pagination.current,
      pageSize: pagination.pageSize
    }
    getTableData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      page
    })
    setPageInfo(page)
  }

  const handleChangePageSize = (pageSize: number) => {
    const page = {
      pageNumber: 1,
      pageSize
    }
    getTableData({
      ...sort,
      page
    })
    setPageInfo(page)
  }

  const handleSelectRow = (
    selectedRowKeys: SetStateAction<never[]>,
    selectedRow: SetStateAction<TTasksList[]>
  ) => {
    setSelectedRowKeys(selectedRowKeys)
    setSelectedRows(selectedRow)
  }

  const onDeleteTask = (id: string[]) => {
    deleteTableDataInfo(id).then(() => {
      setChange((prev) => !prev)
      setSelectedRowKeys([])
    })
  }

  const resetFilter = () => {
    setDate({ ...INITIAL_DATE })
    filterForm.resetFields()
  }

  const onCreateTask = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    addEditForm.resetFields()
  }

  const onEditTask = (data: TTasksList) => {
    addEditForm.setFieldsValue(data)
    setIsModalOpen(true)
  }

  const onAddEditTasks = (values: TTasksList) => {
    if (values.id) {
      updateTableDataInfo(values.id, {
        ...values,
        last_modified: addDate()
      }).then(() => {
        setChange((prev) => !prev)
      })
    } else {
      addTableData({
        ...values,
        id: generateString(),
        created_date: addDate(),
        last_modified: addDate()
      }).then(() => {
        setChange((prev) => !prev)
      })
    }
    setIsModalOpen(false)
    addEditForm.resetFields()
  }

  const showMenu = (data: TTasksList) => (
    <div className="data__dropdown">
      <div className="data__dropdown-item" onClick={() => onEditTask(data)}>
        Edit
      </div>
      <div className="data__dropdown-item" onClick={() => onEditTask({ ...data, id: '' })}>
        Copy
      </div>
    </div>
  )

  return (
    <div className="data">
      <div className="data__header">
        <Input.Default
          className="data__search"
          propsInput={{
            placeholder: 'Search',
            value: searchValue,
            onChange: onSearchChangeValue
          }}
        />
        <Button.Default className="data__create" variant="primary" onClick={onCreateTask}>
          Create tasks
        </Button.Default>
      </div>
      <div className="data__filter-container">
        <Form.Filters setDate={setDate} form={filterForm} />
        <div className="data__buttons">
          {selectedRowKeys.length >= 1 && (
            <Button.Default
              className="data__delete"
              onClick={() => onDeleteTask(selectedRowKeys)}
              variant="primary"
            >
              Delete task
            </Button.Default>
          )}
          {selectedRowKeys.length === 1 && (
            <Button.Default
              className="data__edit"
              onClick={() => onEditTask(selectedRows[0])}
              variant="primary"
            >
              Edit task
            </Button.Default>
          )}
          <Button.Default className="data__reset-filters" variant="secondary" onClick={resetFilter}>
            Reset filters
          </Button.Default>
        </div>
      </div>
      <Table
        dataSource={tableData}
        columns={columns({ showMenu })}
        pageSize={pageInfo.pageSize}
        onChange={handleTableChange}
        onChangePage={handleChangePageSize}
        pagination={{
          pageSize: pageInfo.pageSize,
          current: pageInfo.pageNumber,
          total: pageCount
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectRow
        }}
      />
      <Form.AddEdit
        form={addEditForm}
        open={isModalOpen}
        onFinish={onAddEditTasks}
        handleCancel={handleCancel}
      />
    </div>
  )
}
