import { createContext, SetStateAction, useContext, useState } from 'react';
import { ReactNode } from 'react';



const AuthContext = createContext({
  authToken: null,
  login: (token: string | null) => {},
  logout: () => {},
});


export function AuthProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);

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


