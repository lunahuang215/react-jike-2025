import { Navigate } from 'react-router-dom'
import { getToken } from '@/utils'

const AuthRoute = ({ children }) => {
  const token = getToken()
  if (!token) {
    //return <Navigate to={'/login'} replace />
  }
  return children
}

export default AuthRoute