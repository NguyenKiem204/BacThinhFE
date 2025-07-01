import { useTheme } from "@hooks/useTheme";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@assets/logo.png";
import useAuthStore from "@store/useAuthStore";
import { Link } from "react-router-dom";
import UserDropdown from "@components/common/UserDropdown";

export default function Header() {
  const [theme, setTheme] = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();

  const navItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/masses", label: "Lịch lễ" },
    { href: "/news", label: "Tin tức" },
    { href: "/events", label: "Sự kiện" },
    { href: "/prayers", label: "Kinh nguyện" },
    { href: "/media", label: "Thư viện" },
    { href: "/contact", label: "Liên hệ" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo Giáo Xứ Bắc Thịnh"
              className="w-10 h-10 rounded-lg object-cover bg-white shadow"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Giáo Xứ Bắc Thịnh
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              title={
                theme === "light"
                  ? "Chuyển sang chế độ tối"
                  : "Chuyển sang chế độ sáng"
              }
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            {/* Login/Register or User Dropdown */}
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Đăng ký
                </Link>
              </>
            ) : (
              <UserDropdown user={user} />
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {/* Login/Register or User Info for mobile */}
              {!isAuthenticated ? (
                <div className="flex gap-2 mt-4">
                  <Link
                    to="/login"
                    className="flex-1 px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 text-center"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 px-4 py-2 rounded-lg font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 text-center"
                  >
                    Đăng ký
                  </Link>
                </div>
              ) : (
                <div className="mt-4">
                  <UserDropdown user={user} />
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
