import { IStatusesState } from 'src/redux/types/types'

export const getStatuses = (state: { statuses: IStatusesState }) => state.statuses
