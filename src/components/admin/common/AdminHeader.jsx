import { Menu, Search, Moon, Sun } from "lucide-react";
import UserDropdown from "../../common/UserDropdown";
import useAuthStore from "@store/useAuthStore";
import { useTheme } from "@hooks/useTheme";

export default function AdminHeader({ onMenuClick }) {
  const { user } = useAuthStore();
  const [theme, setTheme] = useTheme();
  return (
    <header className="bg-white dark:bg-gray-900 h-[73px] flex items-center justify-between sticky top-0 z-10 transition-colors duration-300 border-b border-gray-200 dark:border-gray-700 shadow-lg shadow-gray-900/10 dark:shadow-black/30 rounded-tl-2xl pr-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white lg:hidden"
        >
          <Menu size={24} />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
          title={
            theme === "dark"
              ? "Chuyển sang Light mode"
              : "Chuyển sang Dark mode"
          }
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <UserDropdown user={user} />
      </div>
    </header>
  );
}
