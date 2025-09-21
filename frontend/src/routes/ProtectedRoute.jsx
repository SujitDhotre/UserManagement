import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false, userOnly = false }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.type !== 'admin') {
    return <Navigate to="/user-dashboard" replace />;
  }
  //  if (userOnly && user.type !== 'user') {
  //   return <Navigate to="/add-user" replace />;
  // }

  if (userOnly && user.type !== 'user') {
    return <Navigate to="/admin-dashboard" replace />;
  }


  return children;
};

export default ProtectedRoute;
