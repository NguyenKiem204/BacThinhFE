import api from "./api";

// Weekly Schedule Management
export const getAllWeeklySchedules = (params) =>
  api.get("/v1/weekly-schedules", { params });

export const getWeeklyScheduleById = (id) =>
  api.get(`/v1/weekly-schedules/${id}`);

export const createWeeklySchedule = (data) =>
  api.post("/v1/weekly-schedules", data);

export const updateWeeklySchedule = (id, data) =>
  api.put(`/v1/weekly-schedules/${id}`, data);

export const deleteWeeklySchedule = (id) =>
  api.delete(`/v1/weekly-schedules/${id}`);

export const searchWeeklySchedules = (params) =>
  api.get("/v1/weekly-schedules/search", { params });

export const publishWeeklySchedule = (id) =>
  api.post(`/v1/weekly-schedules/${id}/publish`);

export const archiveWeeklySchedule = (id) =>
  api.post(`/v1/weekly-schedules/${id}/archive`);

export const getWeeklySchedulesByYear = (year, params) =>
  api.get(`/v1/weekly-schedules/year/${year}`, { params });

export const getWeeklySchedulesByStatus = (status, params) =>
  api.get(`/v1/weekly-schedules/status/${status}`, { params });

export const getWeeklySchedulesByDateRange = (startDate, endDate, params) =>
  api.get("/v1/weekly-schedules/date-range", {
    params: { startDate, endDate, ...params },
  });

export const getWeeklySchedulesByCreator = (creator, params) =>
  api.get(`/v1/weekly-schedules/creator/${creator}`, { params });

// Daily Schedule Management
export const getDailyScheduleById = (id) =>
  api.get(`/v1/daily-schedules/${id}`);

export const updateDailySchedule = (id, data) =>
  api.put(`/v1/daily-schedules/${id}`, data);

export const deleteDailySchedule = (id) =>
  api.delete(`/v1/daily-schedules/${id}`);

// Mass Management within Daily Schedule
export const getMassesByDailySchedule = (dailyScheduleId) =>
  api.get(`/v1/masses/daily-schedule/${dailyScheduleId}`);

export const addMassToDailySchedule = (dailyScheduleId, data) =>
  api.post(`/v1/masses/daily-schedule/${dailyScheduleId}`, data);

export const updateMassInDailySchedule = (massId, data) =>
  api.put(`/v1/masses/${massId}`, data);

export const deleteMassFromDailySchedule = (massId) =>
  api.delete(`/v1/masses/${massId}`);

export const getMassById = (id) => api.get(`/v1/masses/${id}`);

// Bulk Operations
export const bulkPublishWeeklySchedules = (ids) =>
  api.post("/v1/weekly-schedules/bulk-publish", { ids });

export const bulkArchiveWeeklySchedules = (ids) =>
  api.post("/v1/weekly-schedules/bulk-archive", { ids });

export const bulkDeleteWeeklySchedules = (ids) =>
  api.post("/v1/weekly-schedules/bulk-delete", { ids });

// Export
export const exportWeeklySchedulesToExcel = (params) =>
  api.get("/v1/weekly-schedules/export/excel", {
    params,
    responseType: "blob",
  });

export const exportWeeklySchedulesToPDF = (params) =>
  api.get("/v1/weekly-schedules/export/pdf", {
    params,
    responseType: "blob",
  });
