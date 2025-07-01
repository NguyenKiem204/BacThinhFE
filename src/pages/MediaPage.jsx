import MediaSection from "../components/Home/MediaSection";
import { useMedia } from "../hooks/useMedia";
import { useState, useMemo } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function MediaPage() {
  const { data: media, loading, error } = useMedia();
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Lấy danh sách type duy nhất
  const types = useMemo(() => {
    const set = new Set(media.map((n) => n.type));
    return Array.from(set);
  }, [media]);

  // Reset page về 1 khi đổi filter
  const handleFilterChange = (type) => {
    setFilterType(type);
    setPage(1);
  };

  // Tính tổng số media sau filter
  const filteredMedia = filterType
    ? media.filter((item) => item.type === filterType)
    : media;
  const total = filteredMedia.length;

  // Phân trang
  const pagedMedia = filteredMedia.slice(
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
      <div className="text-center py-20 text-red-500">Lỗi tải thư viện!</div>
    );
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 dark:text-indigo-200 mb-8">
          Thư viện Giáo Xứ Bắc Thịnh
        </h1>
        {/* Filter type dropdown */}
        {types.length > 1 && (
          <div className="mb-8 flex justify-end">
            <select
              className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
              value={filterType || ""}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="">Tất cả thể loại</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}
        <MediaSection media={pagedMedia} hideSeeAllButton />
        {/* Pagination */}
        {total > pageSize && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: Math.ceil(total / pageSize) }).map((_, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-200 ${
                  page === i + 1
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-indigo-100 dark:hover:bg-indigo-900"
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
