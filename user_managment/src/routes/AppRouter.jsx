import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
// import LoginPage from '../Component/LoginPage';
import LoginPage from '../Component/LoginPage';
import UserDashboard from '../Component/UserDashboard';
import AdminDashboard from '../Component/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import AddUserForm from '../Component/AddUserForm';

const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Login Route */}
      <Route 
        path="/login" 
        element={user ? <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} /> : <LoginPage />} 
      />
      
      {/* Admin Routes */}
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/add-user" 
        element={
          <ProtectedRoute adminOnly>
            <AddUserForm />
          </ProtectedRoute>
        } 
      />
      
      {/* User Routes */}
      <Route 
        path="/user-dashboard" 
        element={
          <ProtectedRoute userOnly>
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Legacy dashboard route - redirect based on role */}
      <Route 
        path="/dashboard" 
        element={
          user ? (
            <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      
      {/* Default Routes */}
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      
      {/* Catch all route */}
      <Route 
        path="*" 
        element={<Navigate to="/" />} 
      />
    </Routes>
  );
};

export default AppRouter;