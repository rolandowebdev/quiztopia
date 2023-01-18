import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider';

const PrivateRoutes = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/signin" />;
};

export default PrivateRoutes;
