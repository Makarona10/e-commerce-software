import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../../utils/isAuthenticated';

const ProtectedRoute = ({ component: Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

