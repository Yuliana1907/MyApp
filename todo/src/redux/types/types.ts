import { ASSIGNED, STATUSES } from 'src/contsnts/commonConstants'

export interface IStatus {
  name: keyof typeof STATUSES
}

export interface IStatusesState {
  statuses: IStatus[]
  isLoading: boolean
  error: any | null
}

export interface IAssigners {
  name: keyof typeof ASSIGNED
}

export interface IAssignersState {
  assigners: IAssigners[]
  isLoading: boolean
  error: any | null
}
