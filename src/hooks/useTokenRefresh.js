import { useEffect, useRef } from "react";
import authManager from "@features/auth/auth";
import useAuthStore from "@store/useAuthStore";

const useTokenRefresh = () => {
  const { logout, syncAuth } = useAuthStore();
  const intervalRef = useRef(null);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (authManager.isAuthenticated()) {
        try {
          if (authManager.isTokenExpired()) {
            logout();
          } else if (authManager.shouldRefreshToken()) {
            await authManager.ensureValidToken();
            await syncAuth();
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          logout();
        }
      }
    };
    intervalRef.current = setInterval(checkAndRefreshToken, 30000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [logout, syncAuth]);
  return null;
};

export default useTokenRefresh;
