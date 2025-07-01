import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import UsersManagementPage from "../pages/admin/UsersManagementPage";
import ResidentManagementPage from "../pages/admin/ResidentManagementPage";
import DashboardPage from "../pages/admin/DashboardPage";
import AdminProtectedRoute from "./AdminProtectedRoute";

export const adminRoutes = {
  children: [
    {
      element: <AdminProtectedRoute />,
      children: [
        { path: "dashboard", element: <DashboardPage /> },
        { path: "users", element: <UsersManagementPage /> },
        { path: "residents", element: <ResidentManagementPage /> },
      ],
    },
  ],
};
