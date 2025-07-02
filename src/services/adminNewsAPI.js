import api from "./api";

export const getAllNews = (params) => api.get("/v1/news", { params });
export const getNewsById = (id) => api.get(`/v1/news/${id}`);
export const getNewsBySlug = (slug) => api.get(`/v1/news/slug/${slug}`);
export const createNews = (data) => api.post("/v1/news/create", data);
export const updateNews = (id, data) => api.put(`/v1/news/update/${id}`, data);
export const deleteNews = (id) => api.delete(`/v1/news/delete/${id}`);
export const searchNews = (params) => api.get("/v1/news/search", { params });
export const filterNews = (params) => api.get("/v1/news/filter", { params });
export const changeNewsStatus = (id, status) =>
  api.patch(`/v1/news/${id}/status`, null, { params: { status } });
export const getTrendingNews = (params) =>
  api.get("/v1/news/trending", { params });
export const getLatestNews = (params) => api.get("/v1/news/latest", { params });
export const getNewsByCategory = (categoryId, params) =>
    api.get(`/v1/news/category/${categoryId}`, { params });
export const getNewsByStatus = (status, params) =>
  api.get(`/v1/news/status/${status}`, { params });
export const getNewsByAuthor = (authorId, params) =>
  api.get(`/v1/news/author/${authorId}`, { params });
export const advancedSearchNews = (params) =>
  api.get("/v1/news/advanced-search", { params });
