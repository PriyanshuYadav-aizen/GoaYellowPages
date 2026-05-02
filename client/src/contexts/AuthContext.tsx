import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authAPI } from "../services/auth";

interface User {
  id: string;
  email: string;
  role: "admin" | "superadmin";
  businessId?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = authAPI.getToken();
        if (token) {
          // Decode token to get user info
          const tokenPayload = JSON.parse(atob(token.split(".")[1]));

          // Check if token is expired
          const currentTime = Date.now() / 1000;
          if (tokenPayload.exp < currentTime) {
            // Token expired, logout
            authAPI.logout();
            setIsLoggedIn(false);
            setUser(null);
          } else {
            // Token is valid
            setUser({
              id: tokenPayload.id,
              email: tokenPayload.email,
              role: tokenPayload.role,
              businessId: tokenPayload.businessId,
            });
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        authAPI.logout();
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await authAPI.login({ email, password });

      // Decode token to get user info
      const token = authAPI.getToken();
      if (token) {
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          id: tokenPayload.id,
          email: tokenPayload.email,
          role: tokenPayload.role,
          businessId: tokenPayload.businessId,
        });
        setIsLoggedIn(true);
      }
    } catch (error) {
      throw error; // Re-throw to let the component handle the error
    }
  };

  const logout = () => {
    authAPI.logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  const value: AuthContextType = {
    isLoggedIn,
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
