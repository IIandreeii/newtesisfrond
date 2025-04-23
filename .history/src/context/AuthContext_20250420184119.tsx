import { createContext, useContext, useState, useEffect } from 'react';
import { ReactNode } from 'react';
import Cookies from 'js-cookie';

const TOKEN_COOKIE_NAME = 'authToken';

const AuthContext = createContext<{
  authToken: string | null;
  login: (token: string | null) => void;
  logout: () => void;
}>({
  authToken: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Comprobar si hay un token en las cookies al iniciar
  useEffect(() => {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const login = (token: string | null) => {
    setAuthToken(token);
    if (token) {
      // Guardar token en cookies con una expiración de 7 días (puedes ajustar esto)
      Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 7, secure: true, sameSite: 'strict' });
    } else {
      Cookies.remove(TOKEN_COOKIE_NAME);
    }
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
  return useContext(AuthContext);
}