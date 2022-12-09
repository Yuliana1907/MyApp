import Fetcher from 'src/services/fetcher'
import { HTTP_METHODS } from 'src/contsnts/api'
import {
  TAssigners,
  TLoginForm,
  TLoginFormRequest,
  TQueryParams,
  TStatuses,
  TTasks,
  TTasksList
} from 'src/common/types'
import { URL } from 'src/contsnts/commonConstants'

const fetcher = new Fetcher()

export const requestTableDataInfo = async (data?: TQueryParams) =>
  fetcher.requestToReceive<unknown, TTasks>({
    url: URL.TASKS,
    method: HTTP_METHODS.GET,
    params: { ...data }
  })

export const addTableData = async (data?: TTasksList) =>
  fetcher.requestToReceive<unknown, TTasks>({
    url: URL.TASKS,
    method: HTTP_METHODS.POST,
    data
  })

export const requestAssignersInfo = async () =>
  fetcher.requestToReceive<{}, TAssigners[]>({
    url: URL.ASSIGNERS,
    method: HTTP_METHODS.GET
  })

export const requestStatusesInfo = async () =>
  fetcher.requestToReceive<{}, TStatuses[]>({
    url: URL.STATUSES,
    method: HTTP_METHODS.GET
  })

export const deleteTableDataInfo = async (id: string[]) =>
  fetcher.requestToReceive<{}, TTasks>({
    url: URL.TASKS,
    method: HTTP_METHODS.DELETE,
    params: { id }
  })

export const updateTableDataInfo = async (id: string, data: TTasksList) =>
  fetcher.requestToReceive<{}, TTasks>({
    url: `${URL.TASKS}${id}`,
    method: HTTP_METHODS.PUT,
    data
  })

export const login = async (data: TLoginForm) =>
  fetcher.requestToReceive<TLoginForm, TLoginFormRequest>({
    url: URL.LOGIN,
    method: HTTP_METHODS.POST,
    data
  })
