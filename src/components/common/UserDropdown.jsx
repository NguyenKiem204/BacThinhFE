import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  Shield,
  LogOut,
  ChevronDown,
  Edit,
  Bell,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@store/useAuthStore";

export default function UserDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  // Format last login date
  const formatLastLogin = (lastLogin) => {
    if (!lastLogin) return "Chưa đăng nhập";
    const date = new Date(lastLogin);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const menuItems = [
    {
      label: "Hồ sơ cá nhân",
      icon: User,
      href: "/profile",
      color: "text-blue-600",
    },
    {
      label: "Cài đặt",
      icon: Settings,
      href: "/settings",
      color: "text-gray-600",
    },
    {
      label: "Thông báo",
      icon: Bell,
      href: "/notifications",
      color: "text-orange-600",
    },
    // Admin only items
    ...(user?.role === "ADMIN"
      ? [
          {
            label: "Quản lý admin",
            icon: Shield,
            href: "/admin/dashboard",
            color: "text-green-600",
            badge: "ADMIN",
          },
        ]
      : []),
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 group"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Avatar */}
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.email}
            className="w-8 h-8 rounded-full object-cover border-2 border-blue-400 group-hover:border-blue-500 transition-colors"
          />
        ) : (
          <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg group-hover:from-blue-600 group-hover:to-blue-700 transition-all">
            {user?.email?.[0]?.toUpperCase() || "U"}
          </span>
        )}

        {/* User Info */}
        <div className="hidden sm:block text-left">
          <div className="font-semibold text-gray-900 dark:text-white text-sm max-w-[120px] truncate">
            {user?.email || "User"}
          </div>
          {user?.role === "ADMIN" && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {user.role}
            </div>
          )}
        </div>

        {/* Chevron */}
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
          >
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.email}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
                  />
                ) : (
                  <span className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {user?.email?.[0]?.toUpperCase() || "U"}
                  </span>
                )}
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {user?.email || "User"}
                  </div>
                  {user?.role === "ADMIN" && (
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {user.role}
                    </div>
                  )}
                  {user?.lastLogin && (
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      Đăng nhập: {formatLastLogin(user.lastLogin)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 group"
                  >
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

            {/* Logout */}
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 w-full"
              whileHover={{ x: 5 }}
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
