class AuthManager {
  constructor() {
    this.accessToken = localStorage.getItem("accessToken") || null;
    this.tokenExpirationTime = localStorage.getItem("tokenExpirationTime")
      ? parseInt(localStorage.getItem("tokenExpirationTime"))
      : null;
  }

  setAccessToken(token, expiresIn) {
    this.accessToken = token;
    this.tokenExpirationTime = Date.now() + expiresIn * 1000;
    localStorage.setItem("accessToken", token);
    localStorage.setItem(
      "tokenExpirationTime",
      this.tokenExpirationTime.toString()
    );
  }

  getAccessToken() {
    if (this.accessToken && !this.isTokenExpired()) {
      return this.accessToken;
    }
    const storedToken = localStorage.getItem("accessToken");
    const storedExpirationTime = localStorage.getItem("tokenExpirationTime");
    if (storedToken && storedExpirationTime) {
      this.accessToken = storedToken;
      this.tokenExpirationTime = parseInt(storedExpirationTime);
      if (!this.isTokenExpired()) {
        return this.accessToken;
      }
    }
    return null;
  }

  isTokenExpired() {
    if (!this.tokenExpirationTime) return true;
    return Date.now() >= this.tokenExpirationTime;
  }

  shouldRefreshToken() {
    if (!this.tokenExpirationTime) return false;
    const oneMinuteFromNow = Date.now() + 1 * 60 * 1000;
    return this.tokenExpirationTime <= oneMinuteFromNow;
  }

  async ensureValidToken() {
    if (this.isTokenExpired()) {
      throw new Error("Token has expired");
    }
    if (this.shouldRefreshToken()) {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api"
        }/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const { accessToken, expiresIn } = data.data;
          this.setAccessToken(accessToken, expiresIn);
          return accessToken;
        }
      }
      this.clearTokens();
      throw new Error("Failed to refresh token");
    }
    return this.accessToken;
  }

  isAuthenticated() {
    const token = this.getAccessToken();
    return token !== null;
  }

  clearTokens() {
    this.accessToken = null;
    this.tokenExpirationTime = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpirationTime");
  }
}

const authManager = new AuthManager();
export default authManager;
