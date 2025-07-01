import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Home,
  Calendar,
  BookOpen,
  CalendarPlus,
  Power,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import useAuthStore from "@store/useAuthStore";
import logo from "../../assets/logo.png";

const adminMenu = [
  { group: "HOME" },
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { group: "APPS" },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/residents", label: "Residents", icon: Home },
  { to: "/admin/masses", label: "Masses Schedule", icon: Calendar },
  { to: "/admin/prayer-books", label: "Prayer Books", icon: BookOpen },
  { to: "/admin/events", label: "Events", icon: CalendarPlus },
];

export default function AdminSidebar({ isOpen, setOpen }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed top-0 left-0 z-50 bg-white dark:bg-gray-900 shadow-2xl dark:shadow-black/40 transition-colors duration-300 rounded-tl-2xl ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col h-screen`}
    >
      <div className="flex items-center justify-center p-4 border-b h-[73px] dark:border-gray-700">
        <img
          src={logo}
          alt="Logo"
          className={`overflow-hidden transition-all ${
            isOpen ? "w-10 h-10" : "w-0"
          }`}
        />
        {isOpen && (
          <span className="text-xl font-bold ml-2 text-gray-900 dark:text-white">
            BacThinh
          </span>
        )}
      </div>

      <button
        onClick={() => setOpen(!isOpen)}
        className="absolute -right-3 top-7 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-500 p-1.5 rounded-full shadow-md flex items-center justify-center transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-500"
      >
        {isOpen ? (
          <ChevronsLeft size={16} className="text-gray-700 dark:text-white" />
        ) : (
          <ChevronsRight size={16} className="text-gray-700 dark:text-white" />
        )}
      </button>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {adminMenu.map((item, index) => {
          if (item.group) {
            return isOpen ? (
              <h3
                key={index}
                className="px-3 pt-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {item.group}
              </h3>
            ) : (
              <div key={index} className="h-10"></div>
            );
          }
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              title={item.label}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg transition-colors duration-300 "
                ${
                  isActive
                    ? "bg-blue-500 text-white shadow"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
                `
              }
            >
              <Icon size={20} />
              {isOpen && <span className="ml-4 font-medium">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t dark:border-gray-700 mt-auto">
        <div className="flex items-center p-2 rounded-lg">
          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${user?.email}&background=random`
            }
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          {isOpen && (
            <div className="ml-3">
              <p className="font-semibold text-sm text-gray-900 dark:text-white">
                {user?.email}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role}
              </p>
            </div>
          )}
          {isOpen && (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="ml-auto text-gray-500 dark:text-gray-400 hover:text-red-500"
              title="Logout"
            >
              <Power size={20} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
