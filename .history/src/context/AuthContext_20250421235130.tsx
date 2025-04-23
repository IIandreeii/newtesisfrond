"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const loadToken = () => {
    const storedToken = Cookies.get('authToken');
    setToken(storedToken || null);
  };

  useEffect(() => {
    loadToken();
    window.addEventListener('storage', loadToken);
    return () => {
      window.removeEventListener('storage', loadToken);
    };
  }, []);

  const login = (newToken: string) => {
    Cookies.set('authToken', newToken, { expires: 1 });
    setToken(newToken);
  };

  const logout = () => {
    Cookies.remove('authToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};