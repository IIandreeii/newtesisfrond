import { createContext, useContext, useState, useEffect } from 'react';
import { ReactNode } from 'react';
import Cookies from 'js-cookie';

const TOKEN_COOKIE_NAME = 'authToken';

interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  authToken: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Cargar el token de las cookies al iniciar
  useEffect(() => {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    if (token) {
      setAuthToken(token);
    }
    
    // Opcional: escuchar cambios de almacenamiento en otras pestañas
    const handleStorageChange = () => {
      const currentToken = Cookies.get(TOKEN_COOKIE_NAME);
      setAuthToken(currentToken || null);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (token: string) => {
    setAuthToken(token);
    Cookies.set(TOKEN_COOKIE_NAME, token, { 
      expires: 1, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  };

  const logout = () => {
    setAuthToken(null);
    Cookies.remove(TOKEN_COOKIE_NAME);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}