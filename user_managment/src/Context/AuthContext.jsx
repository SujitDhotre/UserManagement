import React, { createContext, useContext, useState, useEffect } from 'react';
import UserLoginService from '../Services/UserLoginService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // initializeAuth now just clears loading, no localStorage
  useEffect(() => {
    setLoading(false); 
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const payload = { email: username, password };
      const res = await UserLoginService(payload);

      if (res.message === "Login successful") {
        const userData = res.data;

        // Update state only (no localStorage)
        setUser(userData);
        setIsAuthenticated(true);

        return { success: true, user: userData };
      } else {
        return { success: false, message: res.message };
      }
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "An error occurred during login" };
    }
  };

  const setUserData = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const hasRole = (role) => {
    return user?.type === role || user?.role === role;
  };

  const contextValue = React.useMemo(() => ({
    user,
    isAuthenticated,
    loading,
    login,
    setUserData,
    logout,
    hasRole,
  }), [user, isAuthenticated, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
