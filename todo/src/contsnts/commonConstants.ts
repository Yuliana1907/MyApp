import { routes } from 'src/router/config.routes'

export const DEFAULT = {
  pageSize: 30,
  pageNumber: 1
}

export const URL = {
  TASKS: 'tasks/',
  ASSIGNERS: 'assigners',
  STATUSES: 'statuses',
  LOGIN: 'login'
}

export const ASSIGNED = {
  sherry_wilfried: 'Sherry Wilfried',
  asnford_erskine: 'Asnford Erskine',
  dennis_ursula: 'Dennis Ursula'
}

export const STATUSES = {
  create: 'Create',
  active: 'Active',
  canceled: 'Canceled',
  wait: 'Wait',
  archived: 'Archived'
}

export const INITIAL_DATE = {
  created_date: '',
  last_modified: ''
}

export const TABS = [
  {
    key: '0',
    label: 'Tasks',
    hrefTo: routes.tasks
  }
]
