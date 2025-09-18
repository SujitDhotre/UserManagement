import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '1rem' }}>
      <h2>Navigation Bar</h2>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {/* Admin Navigation */}
        {user?.role === 'admin' && (
          <>
            <Link to="/admin-dashboard">Admin Dashboard</Link>
            <Link to="/add-user">Add User</Link>
          </>
        )}
        
        {/* User Navigation */}
        {user?.role === 'user' && (
          <Link to="/user-dashboard">My Dashboard</Link>
        )}
        
        {/* Common Navigation */}
        <span>Welcome, {user?.name || user?.username}!</span>
        <span>Role: {user?.role}</span>
        <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;