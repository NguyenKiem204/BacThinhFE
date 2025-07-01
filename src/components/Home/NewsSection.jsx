import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function NewsSection({
  news = [],
  hideSeeAllButton = false,
  layout = "grid", // "grid" | "list"
  filterCategory = null,
  categories = [],
  pagination = null, // { page, pageSize, onPageChange, total }
  onFilterChange = null,
}) {
  if (!news) return null;

  // Filter by category
  const filteredNews = filterCategory
    ? news.filter((item) => item.category === filterCategory)
    : news;

  // Pagination
  let pagedNews = filteredNews;
  if (pagination) {
    const start = (pagination.page - 1) * pagination.pageSize;
    pagedNews = filteredNews.slice(start, start + pagination.pageSize);
  }

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Tin tức & Thông báo
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Cập nhật những tin tức mới nhất từ giáo xứ và cộng đoàn
        </p>
      </div>

      {/* Filter category dropdown */}
      {categories.length > 1 && (
        <div className="mb-8 flex justify-end">
          <select
            className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            value={filterCategory || ""}
            onChange={(e) => onFilterChange && onFilterChange(e.target.value)}
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

      <div
        className={
          layout === "list"
            ? "flex flex-col gap-8"
            : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        }
      >
        {pagedNews.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <Calendar className="w-4 h-4" />
                <span>{new Date(item.date).toLocaleDateString("vi-VN")}</span>
                <Clock className="w-4 h-4 ml-2" />
                <span>5 phút đọc</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {item.summary}
              </p>

              <motion.a
                href={`/news/${item.id}`}
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all duration-200"
                whileHover={{ x: 5 }}
              >
                Đọc thêm
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.total > pagination.pageSize && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({
            length: Math.ceil(filteredNews.length / pagination.pageSize),
          }).map((_, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-200 ${
                pagination.page === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-900"
              }`}
              onClick={() => pagination.onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Hide See All Button if needed */}
      {!hideSeeAllButton && (
        <div className="text-center mt-12">
          <motion.a
            href="/news"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Xem tất cả tin tức
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      )}
    </section>
  );
}
