import PrayersSection from "../components/Home/PrayersSection";
import { usePrayers } from "../hooks/usePrayers";
import { useState, useMemo } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function PrayersPage() {
  const { data: prayers, loading, error } = usePrayers();
  const [filterCategory, setFilterCategory] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Lấy danh sách category duy nhất
  const categories = useMemo(() => {
    const set = new Set(prayers.map((n) => n.category));
    return Array.from(set);
  }, [prayers]);

  // Reset page về 1 khi đổi filter
  const handleFilterChange = (cat) => {
    setFilterCategory(cat);
    setPage(1);
  };

  // Tính tổng số kinh sau filter
  const filteredPrayers = filterCategory
    ? prayers.filter((item) => item.category === filterCategory)
    : prayers;
  const total = filteredPrayers.length;

  // Phân trang
  const pagedPrayers = filteredPrayers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size={56} />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-red-500">Lỗi tải kinh nguyện!</div>
    );
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-700 dark:text-pink-200 mb-8">
          Kinh nguyện Giáo Xứ Bắc Thịnh
        </h1>
        {/* Filter category dropdown */}
        {categories.length > 1 && (
          <div className="mb-8 flex justify-end">
            <select
              className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
              value={filterCategory || ""}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="">Tất cả thể loại</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex flex-col gap-6">
          <PrayersSection prayers={pagedPrayers} hideSeeAllButton />
        </div>
        {/* Pagination */}
        {total > pageSize && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: Math.ceil(total / pageSize) }).map((_, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-200 ${
                  page === i + 1
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-pink-100 dark:hover:bg-pink-900"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
