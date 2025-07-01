import { create } from "zustand";
import { persist } from "zustand/middleware";
import authManager from "@features/auth/auth";
import { loginWithEmail, getCurrentUser } from "@features/auth/authAPI";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await loginWithEmail(credentials);

          if (response.success) {
            const userResponse = await getCurrentUser();
            if (userResponse.success) {
              set({
                user: userResponse.data,
                isAuthenticated: true,
                isLoading: false,
              });
            } else {
              set({
                user: {
                  email: credentials.email,
                  role: "USER",
                },
                isAuthenticated: true,
                isLoading: false,
              });
            }
          } else {
            set({ isLoading: false });
          }
          return response;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        authManager.clearTokens();
        localStorage.removeItem("auth-storage");
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      fetchCurrentUser: async () => {
        if (authManager.isAuthenticated()) {
          try {
            const response = await getCurrentUser();
            if (response.success) {
              set({ user: response.data });
            } else {
              authManager.clearTokens();
              set({
                user: null,
                isAuthenticated: false,
              });
            }
          } catch {
            authManager.clearTokens();
            set({
              user: null,
              isAuthenticated: false,
            });
          }
        }
      },

      syncAuth: async () => {
        try {
          const isAuthenticated = authManager.isAuthenticated();
          set({ isAuthenticated });

          if (isAuthenticated) {
            if (authManager.shouldRefreshToken()) {
              try {
                await authManager.ensureValidToken();
              } catch {
                authManager.clearTokens();
                set({
                  user: null,
                  isAuthenticated: false,
                });
                return;
              }
            }

            const response = await getCurrentUser();
            if (response.success) {
              set({ user: response.data });
            } else {
              authManager.clearTokens();
              set({
                user: null,
                isAuthenticated: false,
              });
            }
          } else {
            set({ user: null });
          }
        } catch {
          authManager.clearTokens();
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
