"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  authToken: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Inicializar el estado desde las cookies al cargar
  useEffect(() => {
    try {
      const token = Cookies.get('auth-token');
      console.log('Token recuperado de cookies:', token);
      
      if (token) {
        setAuthToken(token);
      }
    } catch (error) {
      console.error('Error loading authentication state:', error);
      Cookies.remove('auth-token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (token: string) => {
    // Validar token
    if (!token) {
      console.error('Attempted to login with empty token');
      return;
    }
    
    // Guardar token en estado
    setAuthToken(token);
    
    // Configuración mejorada de cookies
    Cookies.set('auth-token', token, { 
      expires: 1,            // Expira en 1 día
      path: '/',             // Disponible en toda la aplicación
      sameSite: 'strict',       // Menos restrictivo que 'strict', pero sigue siendo seguro
      secure: process.env.NODE_ENV === 'production',
      domain: window.location.hostname // Asegura que funcione en el dominio correcto
    });
  };

  const logout = () => {
    // Limpiar estado
    setAuthToken(null);
    
    // Eliminar cookie de token
    Cookies.remove('auth-token');
    
    // Redirigir a la página de inicio
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ 
      authToken, 
      isLoading, 
      login, 
      logout 
    }}>
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