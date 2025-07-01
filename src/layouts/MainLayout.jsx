import { Outlet } from "react-router-dom";
import Header from "@layouts/Header";
import Footer from "@layouts/Footer";
import { cn } from "@utils/cn";

export default function MainLayout() {
  return (
    <div
      className={cn(
        "min-h-screen bg-gray-50 dark:bg-gray-900",
        "flex flex-col"
      )}
    >
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
