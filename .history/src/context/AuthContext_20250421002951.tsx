"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  // Agrega otros campos según tu modelo de usuario
}

interface AuthContextType {
  authToken: string | null;
  user: User | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Inicializar el estado desde las cookies al cargar
  useEffect(() => {
    const token = Cookies.get('auth-token');
    const userData = Cookies.get('user-data');
    
    if (token) {
      setAuthToken(token);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data from cookie', error);
        }
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = (token: string, userData: User) => {
    // Guardar en estado
    setAuthToken(token);
    setUser(userData);
    
    // Guardar en cookies
    Cookies.set('auth-token', token, { 
      expires: 7, // Expira en 7 días
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
    
    Cookies.set('user-data', JSON.stringify(userData), {
      expires: 7,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
  };

  const logout = () => {
    // Limpiar estado
    setAuthToken(null);
    setUser(null);
    
    // Eliminar cookies
    Cookies.remove('auth-token');
    Cookies.remove('user-data');
    
    // Redirigir a la página de inicio
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ authToken, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}