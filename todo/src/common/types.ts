import { ASSIGNED, STATUSES } from 'src/contsnts/commonConstants'

export type TTasks = {
  count: number
  results: TTasksList[]
}

export type TTasksList = {
  assigned_type: keyof typeof ASSIGNED
  created_date: string
  id: string
  last_modified: string
  statuses_type: keyof typeof STATUSES
  task_name: string
}

export type TDate = {
  created_date: string
  last_modified: string
}

export type TStatuses = {
  name: keyof typeof STATUSES
}

export type TAssigners = {
  name: keyof typeof ASSIGNED
}

export type TQueryParams = {
  search?: string
  ordering?: string
  limit?: number | string
  offset?: number
  field?: keyof TTasksList
  created_date?: string
  last_modified?: string
  assigned_type?: string
  statuses_type?: string
}

export type TLoginForm = {
  login: string
  password: string
}

export type TLoginFormRequest = {
  token: string
  email: string
}
