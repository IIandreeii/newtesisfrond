import { createContext, SetStateAction, useContext, useState } from 'react';

const AuthContext = createContext({
  authToken: null,
  login: (token: string | null) => {},
  logout: () => {},
});

import { ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState(null);

  const login = (token: string | SetStateAction<null>) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
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


