// app/AuthProvider.jsx
'use client'

import { createContext, useContext, useEffect, useState } from "react";
type authContextType = {
  authenticated: boolean | null;
  userID: number | null;
  loggedInUser: string | null;
  login: (user:string, userID:number) => void;
  logout: () => void;
}
const AuthContext = createContext<authContextType | null>(null);


export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [userID, setUserID] = useState(null)
  useEffect(() => {
    const stored = localStorage.getItem("authenticated");
    const storedID = localStorage.getItem("userID")
    setAuthenticated(stored === "true");
    setUserID(storedID);
  }, []);

  function login(user:string, userID:number) {
    localStorage.setItem("authenticated", "true");
    localStorage.setItem("userID", String(userID))
    setAuthenticated(true);
    setLoggedInUser(user)
  }

  function logout() {
    localStorage.setItem("authenticated", "false");
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, loggedInUser, userID }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}