// app/AuthProvider.jsx
'use client'

import { createContext, useContext, useEffect, useState } from "react";
type authContextType = {
  authenticated: boolean | null;
  loggedInUser: string | null;
  login: (user:string) => void;
  logout: () => void;
}
const AuthContext = createContext<authContextType | null>(null);


export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null)
  useEffect(() => {
    const stored = localStorage.getItem("authenticated");
    setAuthenticated(stored === "true");
  }, []);

  function login(user:string) {
    localStorage.setItem("authenticated", "true");
    setAuthenticated(true);
    setLoggedInUser(user)
  }

  function logout() {
    localStorage.setItem("authenticated", "false");
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, loggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}