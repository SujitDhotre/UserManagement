import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import UserLoginService from '../Services/UserLoginService'; // your API service

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-load user from localStorage (persistent login)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const payload = { email: username, password };
      const res = await UserLoginService(payload);

      if (res.message === 'Login successful') {
        const userData = res.data;

        // Save user in state + localStorage (without sensitive info if possible)
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        // If backend sends JWT token, save it too
        if (userData.token) {
          localStorage.setItem('authToken', userData.token);
        }

        return { success: true, user: userData };
      } else {
        return { success: false, message: res.message };
      }
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: 'An error occurred during login' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
