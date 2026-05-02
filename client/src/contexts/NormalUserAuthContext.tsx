import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { normalUserAuthAPI } from "../services/normalUserAuth";

interface NormalUserInfo {
  id: string;
  name: string;
  email: string;
}

interface NormalUserAuthContextType {
  isLoggedIn: boolean;
  user: NormalUserInfo | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const NormalUserAuthContext = createContext<NormalUserAuthContextType | undefined>(undefined);

export const NormalUserAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<NormalUserInfo | null>(null);

  useEffect(() => {
    try {
      const token = normalUserAuthAPI.getToken();
      if (token) {
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;
        if (tokenPayload.exp && tokenPayload.exp < currentTime) {
          normalUserAuthAPI.logout();
          setIsLoggedIn(false);
          setUser(null);
        } else {
          setUser({ id: tokenPayload.id, name: tokenPayload.name || "", email: tokenPayload.email });
          setIsLoggedIn(true);
        }
      }
    } catch (e) {
      normalUserAuthAPI.logout();
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const login = async (email: string, password: string) => {
    await normalUserAuthAPI.login({ email, password });
    const token = normalUserAuthAPI.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ id: payload.id, name: payload.name || "", email: payload.email });
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    normalUserAuthAPI.logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <NormalUserAuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </NormalUserAuthContext.Provider>
  );
};

export const useNormalUserAuth = (): NormalUserAuthContextType => {
  const ctx = useContext(NormalUserAuthContext);
  if (!ctx) throw new Error("useNormalUserAuth must be used within NormalUserAuthProvider");
  return ctx;
};


