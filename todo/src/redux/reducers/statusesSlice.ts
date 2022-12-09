import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IStatus, IStatusesState } from 'src/redux/types/types'

const initialState: IStatusesState = {
  statuses: [],
  isLoading: false,
  error: null
}

export const statusesSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    loading(state: IStatusesState) {
      state.isLoading = true
      state.error = null
    },
    loadingSuccess(state: IStatusesState, action: PayloadAction<IStatus[]>) {
      state.isLoading = false
      state.statuses = action.payload
    },
    finish(state: IStatusesState) {
      state.isLoading = false
    },
    error(state: IStatusesState, action: PayloadAction<{ error: IStatusesState['error'] }>) {
      const { error } = action.payload
      state.error = error.response.data
    }
  }
})

export default statusesSlice.reducer
export const { loading, loadingSuccess, finish, error } = statusesSlice.actions
