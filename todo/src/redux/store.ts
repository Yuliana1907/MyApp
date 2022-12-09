import { ThunkAction, Action, configureStore } from '@reduxjs/toolkit'
import statusesReducers from './reducers/statusesSlice'
import assignersReducers from './reducers/assignersSlice'

export const store = configureStore({
  reducer: {
    statuses: statusesReducers,
    assigners: assignersReducers
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
