import api from "@services/api";

export const loginWithEmail = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export async function loginWithGoogle() {
  console.warn("loginWithGoogle is not implemented");
  return { success: false, message: "Chức năng chưa được hỗ trợ." };
}

export async function loginWithFacebook() {
  console.warn("loginWithFacebook is not implemented");
  return { success: false, message: "Chức năng chưa được hỗ trợ." };
}
