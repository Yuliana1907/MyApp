import { IAssignersState } from 'src/redux/types/types'

export const getAssigners = (state: { assigners: IAssignersState }) => state.assigners
