import api from "./api";

export const fetchUsers = (params) => api.get("/v1/user", { params });
export const searchUsers = (params) => api.get("/v1/user/search", { params });
export const getUserById = (id) => api.get(`/v1/user/${id}`);
export const createUser = (data) => api.post("/v1/user/create-user", data);
export const updateUser = (id, data) =>
  api.put(`/v1/user/admin-update/${id}`, data);
export const deleteUser = (id) => api.delete(`/v1/user/${id}`);
