import api from "./api";

// Individual Mass Management
export const getAllMasses = (params) => api.get("/v1/masses", { params });

export const getMassById = (id) => api.get(`/v1/masses/${id}`);

export const createMass = (data) => api.post("/v1/masses", data);

export const updateMass = (id, data) => api.put(`/v1/masses/${id}`, data);

export const deleteMass = (id) => api.delete(`/v1/masses/${id}`);

// Search and Filter
export const searchMasses = (params) =>
  api.get("/v1/masses/search", { params });

export const getMassesByDate = (date, params) =>
  api.get(`/v1/masses/by-date`, {
    params: { date, ...params },
  });

export const getMassesByDateRange = (startDate, endDate, params) =>
  api.get("/v1/masses/by-date-range", {
    params: { startDate, endDate, ...params },
  });

export const getMassesByCelebrant = (celebrant, params) =>
  api.get(`/v1/masses/by-celebrant`, {
    params: { celebrant, ...params },
  });

export const getMassesByType = (type, params) =>
  api.get(`/v1/masses/by-type`, {
    params: { type, ...params },
  });

export const getSolemnMasses = (params) =>
  api.get("/v1/masses/solemn", { params });

export const getMassesByDailySchedule = (dailyScheduleId, params) =>
  api.get(`/v1/masses/daily-schedule/${dailyScheduleId}`, { params });

// Advanced Search
export const advancedSearchMasses = (params) =>
  api.get("/v1/masses/advanced-search", { params });

export const getMassesByTimeRange = (startTime, endTime, params) =>
  api.get("/v1/masses/by-time-range", {
    params: { startTime, endTime, ...params },
  });

// Bulk Operations
export const bulkCreateMasses = (data) =>
  api.post("/v1/masses/bulk-create", data);

export const bulkUpdateMasses = (data) =>
  api.post("/v1/masses/bulk-update", data);

export const bulkDeleteMasses = (ids) =>
  api.post("/v1/masses/bulk-delete", { ids });

// Mass Templates
export const getMassTemplates = (params) =>
  api.get("/v1/masses/templates", { params });

export const createMassTemplate = (data) =>
  api.post("/v1/masses/templates", data);

export const updateMassTemplate = (id, data) =>
  api.put(`/v1/masses/templates/${id}`, data);

export const deleteMassTemplate = (id) =>
  api.delete(`/v1/masses/templates/${id}`);

export const applyMassTemplate = (templateId, dailyScheduleId) =>
  api.post(`/v1/masses/templates/${templateId}/apply`, { dailyScheduleId });

// Conflict Detection
export const checkTimeConflicts = (
  dailyScheduleId,
  time,
  excludeMassId = null
) =>
  api.get("/v1/masses/check-conflicts", {
    params: { dailyScheduleId, time, excludeMassId },
  });

// Export
export const exportMassesToExcel = (params) =>
  api.get("/v1/masses/export/excel", {
    params,
    responseType: "blob",
  });

export const exportMassesToPDF = (params) =>
  api.get("/v1/masses/export/pdf", {
    params,
    responseType: "blob",
  });

// Statistics
export const getMassStatistics = (params) =>
  api.get("/v1/masses/statistics", { params });

export const getMassCountByDate = (startDate, endDate) =>
  api.get("/v1/masses/count-by-date", {
    params: { startDate, endDate },
  });

export const getMassCountByCelebrant = (startDate, endDate) =>
  api.get("/v1/masses/count-by-celebrant", {
    params: { startDate, endDate },
  });
