import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  console.log('user in private route is:',user)
  
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
