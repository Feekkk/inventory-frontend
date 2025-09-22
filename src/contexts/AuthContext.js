import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedAuth = localStorage.getItem('unikl_auth');
    const savedUser = localStorage.getItem('unikl_user');
    
    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData = null) => {
    const defaultUser = {
      email: 'admin@unikl.my',
      name: 'System Administrator',
      role: 'technician',
      loginTime: new Date().toISOString()
    };
    
    const userToSet = userData || defaultUser;
    
    setIsAuthenticated(true);
    setUser(userToSet);
    
    // Persist in localStorage
    localStorage.setItem('unikl_auth', 'true');
    localStorage.setItem('unikl_user', JSON.stringify(userToSet));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    
    // Clear localStorage
    localStorage.removeItem('unikl_auth');
    localStorage.removeItem('unikl_user');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};