import React from "react";

const statusMap = {
  DRAFT: {
    label: "Nháp",
    className: "bg-gray-400 text-white",
  },
  PUBLISHED: {
    label: "Đã xuất bản",
    className: "bg-green-500 text-white",
  },
  ARCHIVED: {
    label: "Lưu trữ",
    className: "bg-red-500 text-white",
  },
};

const WeeklyScheduleStatusBadge = ({ status }) => {
  const info = statusMap[status] || {
    label: status,
    className: "bg-gray-200 text-gray-800",
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-bold ${info.className}`}>
      {info.label}
    </span>
  );
};

export default WeeklyScheduleStatusBadge;
