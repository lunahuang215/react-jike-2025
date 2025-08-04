import { createSlice } from '@reduxjs/toolkit'
import { request } from '@/utils'
import { getToken, setToken as setTokenUtil, removeToken } from '@/utils/token'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || ''
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      setTokenUtil(action.payload)
    }
  },
})

const { setToken } = userSlice.actions

const fetchToken = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', loginForm)
    console.log('token', res.data.data.token)
    dispatch(setToken(res.data.data.token))
  }
}

export { fetchToken }
export default userSlice.reducer