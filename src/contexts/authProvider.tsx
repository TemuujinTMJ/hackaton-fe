"use client";
import { IUser } from "@/types/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  userInfo: IUser | null;
  setUserInfo: (user: IUser | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [userInfo, setUserState] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  // Client дээр л localStorage-г унших
  useEffect(() => {
    const savedToken = localStorage.getItem("sessionToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setTokenState(savedToken);
      setIsAuthenticated(true);
    }

    if (savedUser) {
      try {
        setUserState(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (typeof window !== "undefined") {
      if (newToken) {
        localStorage.setItem("sessionToken", newToken);
      } else {
        localStorage.removeItem("sessionToken");
      }
    }
  };

  const setUserInfo = (newUser: IUser | null) => {
    setUserState(newUser);
    if (typeof window !== "undefined") {
      if (newUser) {
        localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        localStorage.removeItem("user");
      }
    }
  };

  const logout = () => {
    setTokenState(null);
    setUserState(null);
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("user");
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userInfo,
        setUserInfo,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};
