import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If there is no user logged in, send them straight to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, render the page they asked for
  return children;
};

export default ProtectedRoute;