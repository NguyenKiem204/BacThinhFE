// AuthProvider.jsx - Wrap your app with this
import React, { createContext, useEffect, useState } from "react";
import useAuthStore from "@store/useAuthStore";
import authManager from "@features/auth/auth";
import useTokenRefresh from "@hooks/useTokenRefresh";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { syncAuth, logout } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useTokenRefresh();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authManager.isAuthenticated()) {
          if (authManager.shouldRefreshToken()) {
            try {
              await authManager.ensureValidToken();
            } catch {
              logout();
              setIsInitialized(true);
              return;
            }
          }

          await syncAuth();
        }
      } catch {
        logout();
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [syncAuth, logout]);

  // Không render children cho đến khi auth được khởi tạo xong
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang khởi tạo...</p>
        </div>
      </div>
    );
  }

  const value = {
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
