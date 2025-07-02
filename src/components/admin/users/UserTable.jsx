import React from "react";
import { formatDateTime } from "@utils/formatDate";

const UserTable = ({ users, loading, onEdit, onDelete }) => (
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-xl overflow-hidden shadow-lg">
    <thead className="bg-gray-100 dark:bg-gray-800">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
          ID
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
          Email
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
          Role
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
          Status
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
          Resident ID
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
          Created At
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <tr>
          <td colSpan="7" className="text-center py-6">
            Đang tải...
          </td>
        </tr>
      ) : users.length === 0 ? (
        <tr>
          <td colSpan="7" className="text-center py-6 text-gray-400">
            Không có dữ liệu
          </td>
        </tr>
      ) : (
        users.map((user, idx) => (
          <tr
            key={user.id}
            className={`text-sm ${
              idx % 2 === 0
                ? "bg-white dark:bg-gray-900"
                : "bg-gray-50 dark:bg-gray-800"
            } border-b border-gray-100 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200`}
          >
            <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
              {user.id}
            </td>
            <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
              {user.email}
            </td>
            <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
              {user.role}
            </td>
            <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
              {user.status}
            </td>
            <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
              {user.residentId}
            </td>
            <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
              {formatDateTime(user.createdAt)}
            </td>
            <td className="px-4 py-2 flex gap-2">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow text-xs font-semibold transition"
                onClick={() => onEdit(user)}
              >
                Sửa
              </button>
              <button
                className="bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-red-500 hover:text-white px-3 py-1 rounded shadow text-xs font-semibold transition"
                onClick={() => onDelete(user.id)}
              >
                Xóa
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default UserTable;
