import { createSlice } from '@reduxjs/toolkit'
import { getToken, setToken as setTokenUtil, removeToken } from '@/utils/token'
import { loginAPI, getUserInfoAPI } from '@/apis/user'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      setTokenUtil(action.payload)
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    clearUserInfo: (state) => {
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
  },
})

const { setToken, setUserInfo, clearUserInfo } = userSlice.actions

const fetchToken = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm)
    console.log('token', res.data.data.token)
    dispatch(setToken(res.data.data.token))
  }
}

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getUserInfoAPI()
    dispatch(setUserInfo(res.data.data))
  }
}

export { fetchToken, fetchUserInfo, clearUserInfo }
export default userSlice.reducer