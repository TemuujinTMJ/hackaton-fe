"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { UserInfo, AuthState } from "@/types/auth";

export function useAuth(): AuthState {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for token in localStorage
    const storedToken = localStorage.getItem("sessionToken");
    setToken(storedToken);
    setIsLoading(false);

    if (!storedToken) {
      router.push("/login");
    }
  }, [router]);

  const login = (token: string, userInfo: UserInfo) => {
    localStorage.setItem("sessionToken", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setToken(token);

    // Also set in cookies for middleware
    document.cookie = `sessionToken=${token}; path=/`;

    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("userInfo");
    setToken(null);

    // Remove from cookies
    document.cookie =
      "sessionToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

    router.push("/login");
  };

  return {
    isLoading,
    isAuthenticated: !!token,
    token,
    login,
    logout,
    setToken,
  };
}
