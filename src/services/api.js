import axios from "axios";
import authManager from "@features/auth/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  async (config) => {
    if (authManager.isAuthenticated() && authManager.shouldRefreshToken()) {
      try {
        await authManager.ensureValidToken();
      } catch (error) {
        console.log(error);
      }
    }
    const accessToken = authManager.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      isRefreshing = true;
      try {
        const refreshResponse = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          {
            withCredentials: true,
            headers: {
              ...api.defaults.headers,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        if (refreshResponse.data.success) {
          const { accessToken, expiresIn } = refreshResponse.data.data;
          authManager.setAccessToken(accessToken, expiresIn);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          processQueue(null, accessToken);
          return api(originalRequest);
        } else {
          authManager.clearTokens();
          processQueue(new Error("Refresh token failed"));
          if (typeof window !== "undefined") {
            window.location.href = "/bacthinh/login";
          }
          return Promise.reject(error);
        }
      } catch (refreshError) {
        authManager.clearTokens();
        processQueue(refreshError);
        if (typeof window !== "undefined") {
          window.location.href = "/bacthinh/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
