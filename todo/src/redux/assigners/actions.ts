import { AppThunk } from '../store'
import { finish, loading, loadingSuccess, error } from 'src/redux/reducers/assignersSlice'
import { requestAssignersInfo } from 'src/common/api'

export const requestAssigners = (): AppThunk => async (dispatch) => {
  try {
    dispatch(loading())
    const response = await requestAssignersInfo()
    dispatch(loadingSuccess(response.data))
  } catch (err) {
    dispatch(error({ error: err }))
  } finally {
    dispatch(finish())
  }
}
