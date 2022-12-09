import { AppThunk } from '../store'
import { finish, loading, loadingSuccess, error } from 'src/redux/reducers/statusesSlice'
import { requestStatusesInfo } from 'src/common/api'

export const requestStatuses = (): AppThunk => async (dispatch) => {
  try {
    dispatch(loading())
    const response = await requestStatusesInfo()
    dispatch(loadingSuccess(response.data))
  } catch (err) {
    dispatch(error({ error: err }))
  } finally {
    dispatch(finish())
  }
}
