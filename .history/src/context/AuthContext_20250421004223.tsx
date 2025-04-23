"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  
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
    try {
      const token = Cookies.get('auth-token');
      const userData = Cookies.get('user-data');
      
      if (token) {
        setAuthToken(token);
        
        if (userData && userData !== 'undefined') {
          try {
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
          } catch (error) {
            console.error('Error parsing user data from cookie:', error);
            // Si hay un error al parsear, eliminar la cookie corrupta
            Cookies.remove('user-data');
          }
        }
      }
    } catch (error) {
      console.error('Error loading authentication state:', error);
      // Limpiar cookies potencialmente corruptas
      Cookies.remove('auth-token');
      Cookies.remove('user-data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (token: string, userData: User) => {
    // Validar datos antes de guardar
    if (!token) {
      console.error('Attempted to login with empty token');
      return;
    }
    
    // Guardar en estado
    setAuthToken(token);
    setUser(userData);
    
    // Guardar en cookies
    Cookies.set('auth-token', token, { 
      expires: 7, // Expira en 7 días
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
    
    if (userData) {
      try {
        Cookies.set('user-data', JSON.stringify(userData), {
          expires: 7,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        });
      } catch (error) {
        console.error('Error storing user data in cookie:', error);
      }
    }
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