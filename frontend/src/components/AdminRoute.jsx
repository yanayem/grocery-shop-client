import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // In a real application, you would check if the user has an 'admin' role
  // either from Firebase Custom Claims or from your MongoDB user profile.
  // For this demonstration, we'll allow access if the user is logged in.
  // Ideally: if (currentUser?.role !== 'admin') return <Navigate to="/" />;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
