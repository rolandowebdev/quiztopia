import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider'

export const PrivateRoutes = ({ children }) => {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to="/signin" />
}
