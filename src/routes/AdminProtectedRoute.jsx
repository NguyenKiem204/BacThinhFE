import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@store/useAuthStore";

export default function AdminProtectedRoute() {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || user?.role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
