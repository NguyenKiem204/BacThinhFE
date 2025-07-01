import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import { useState } from "react";
import { useTheme } from "@hooks/useTheme";

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  useTheme(); // chỉ cần gọi để đảm bảo effect hoạt động

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <AdminSidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
      <div
        className={`flex-1 flex flex-col transition-colors duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <AdminHeader onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-6 overflow-y-auto transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
