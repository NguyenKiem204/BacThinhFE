import api from "./api";

export const fetchResidents = (params) => api.get("/v1/residents", { params });
export const searchResidents = (params) =>
  api.get("/v1/residents/search", { params });
export const getResidetById = (id) => api.get(`/v1/resdients/${id}`);
export const createResident = (data) => api.post("/v1/resdients/create", data);
export const updateResident = (id, data) =>
  api.put(`/v1/resdients/update/${id}`, data);
export const deleteResident = (id) => api.delete(`/v1/resdients/delete/${id}`);
