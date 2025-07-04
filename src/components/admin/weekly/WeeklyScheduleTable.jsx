import React from "react";
import WeeklyScheduleStatusBadge from "./WeeklyScheduleStatusBadge";
// import WeeklyScheduleStatusBadge nếu có

const WeeklyScheduleTable = ({
  schedules = [],
  loading,
  onEdit,
  onView,
  onDelete,
  onPublish,
  onArchive,
  pagination,
  setPagination,
  sort,
  setSort,
}) => {
  const totalPages = Math.ceil(
    (pagination?.total || 0) / (pagination?.size || 10)
  );
  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-2 dark:text-white">ID</th>
            <th className="px-4 py-2 dark:text-white">Tuần</th>
            <th className="px-4 py-2 dark:text-white">
              Ngày bắt đầu - Ngày kết thúc
            </th>
            <th className="px-4 py-2 dark:text-white">Tiêu đề</th>
            <th className="px-4 py-2 dark:text-white">Trạng thái</th>
            <th className="px-4 py-2 dark:text-white">Người tạo</th>
            <th className="px-4 py-2 dark:text-white">Ngày tạo</th>
            <th className="px-4 py-2 dark:text-white">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center py-8 dark:text-white">
                Đang tải...
              </td>
            </tr>
          ) : schedules.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-8 dark:text-white">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            schedules.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-2 font-semibold dark:text-white">
                  {s.id}
                </td>
                <td className="px-4 py-2 dark:text-white">
                  Tuần {s.weekNumber}, {s.year}
                </td>
                <td className="px-4 py-2 dark:text-white">
                  {s.weekStartDate} - {s.weekEndDate}
                </td>
                <td className="px-4 py-2 dark:text-white">{s.title}</td>
                <td className="px-4 py-2 dark:text-white">
                  <WeeklyScheduleStatusBadge status={s.status} />
                </td>
                <td className="px-4 py-2 dark:text-white">{s.createdBy}</td>
                <td className="px-4 py-2 dark:text-white">
                  {s.createdAt?.slice(0, 10)}
                </td>
                <td className="px-4 py-2 flex gap-1 dark:text-white">
                  <button
                    className="text-blue-600 hover:underline dark:text-blue-400"
                    onClick={() => onView(s)}
                  >
                    Xem
                  </button>
                  <button
                    className="text-yellow-600 hover:underline dark:text-yellow-400"
                    onClick={() => onEdit(s)}
                  >
                    Sửa
                  </button>
                  <button
                    className="text-red-600 hover:underline dark:text-red-400"
                    onClick={() => onDelete(s.id)}
                  >
                    Xóa
                  </button>
                  {s.status === "DRAFT" && (
                    <button
                      className="text-green-600 hover:underline dark:text-green-400"
                      onClick={() => onPublish(s.id)}
                    >
                      Xuất bản
                    </button>
                  )}
                  {s.status === "PUBLISHED" && (
                    <button
                      className="text-gray-600 hover:underline dark:text-gray-300"
                      onClick={() => onArchive(s.id)}
                    >
                      Lưu trữ
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 mt-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Tổng số:{" "}
          <span className="font-semibold dark:text-white">
            {pagination?.total || 0}
          </span>{" "}
          lịch tuần
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded-lg disabled:opacity-50 bg-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setPagination((p) => ({ ...p, page: 0 }))}
            disabled={pagination?.page === 0}
          >
            Đầu
          </button>
          <button
            className="px-3 py-1 border rounded-lg disabled:opacity-50 bg-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() =>
              setPagination((p) => ({
                ...p,
                page: Math.max(0, (p.page || 0) - 1),
              }))
            }
            disabled={pagination?.page === 0}
          >
            Trước
          </button>
          <span className="mx-2 dark:text-gray-200">
            Trang{" "}
            <span className="font-semibold dark:text-white">
              {(pagination?.page || 0) + 1}
            </span>{" "}
            / {totalPages || 1}
          </span>
          <button
            className="px-3 py-1 border rounded-lg disabled:opacity-50 bg-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() =>
              setPagination((p) => ({
                ...p,
                page: Math.min(totalPages - 1, (p.page || 0) + 1),
              }))
            }
            disabled={(pagination?.page || 0) + 1 >= totalPages}
          >
            Sau
          </button>
          <button
            className="px-3 py-1 border rounded-lg disabled:opacity-50 bg-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() =>
              setPagination((p) => ({ ...p, page: totalPages - 1 }))
            }
            disabled={(pagination?.page || 0) + 1 >= totalPages}
          >
            Cuối
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyScheduleTable;
