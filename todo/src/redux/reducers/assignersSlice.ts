import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAssigners, IAssignersState } from 'src/redux/types/types'

const initialState: IAssignersState = {
  assigners: [],
  isLoading: false,
  error: null
}

export const assignersSlice = createSlice({
  name: 'assigners',
  initialState,
  reducers: {
    loading(state: IAssignersState) {
      state.isLoading = true
      state.error = null
    },
    loadingSuccess(state: IAssignersState, action: PayloadAction<IAssigners[]>) {
      state.isLoading = false
      state.assigners = action.payload
    },
    finish(state: IAssignersState) {
      state.isLoading = false
    },
    error(state: IAssignersState, action: PayloadAction<{ error: IAssignersState['error'] }>) {
      const { error } = action.payload
      state.error = error.response.data
    }
  }
})

export default assignersSlice.reducer
export const { loading, loadingSuccess, finish, error } = assignersSlice.actions
