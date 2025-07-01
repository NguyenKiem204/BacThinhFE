import NewsSection from "../components/Home/NewsSection";
import { useNews } from "../hooks/useNews";
import { useState, useMemo } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function NewsPage() {
  const { data: news, loading, error } = useNews();
  const [filterCategory, setFilterCategory] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Lấy danh sách category duy nhất
  const categories = useMemo(() => {
    const set = new Set(news.map((n) => n.category));
    return Array.from(set);
  }, [news]);

  // Reset page về 1 khi đổi filter
  const handleFilterChange = (cat) => {
    setFilterCategory(cat);
    setPage(1);
  };

  // Tính tổng số tin sau filter
  const filteredNews = filterCategory
    ? news.filter((item) => item.category === filterCategory)
    : news;
  const total = filteredNews.length;

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size={56} />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-red-500">Lỗi tải tin tức!</div>
    );
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-200 mb-8">
          Tin tức Giáo Xứ Bắc Thịnh
        </h1>
        <NewsSection
          news={news}
          hideSeeAllButton={true}
          layout="grid"
          filterCategory={filterCategory || null}
          categories={categories}
          onFilterChange={handleFilterChange}
          pagination={{ page, pageSize, onPageChange: setPage, total }}
        />
      </div>
    </main>
  );
}
