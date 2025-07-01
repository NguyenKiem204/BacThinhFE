import { motion } from "framer-motion";
import { Music, PlayCircle, Headphones, ArrowRight } from "lucide-react";

export default function MediaSection({ media }) {
  if (!media) return null;

  const getTypeColor = (type) => {
    if (type === "Thánh ca")
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (type === "Bài giảng")
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Headphones className="w-6 h-6" /> Media mới
        </h2>
        <p className="text-indigo-100">
          Những bản thánh ca, bài giảng và audio mới nhất từ cộng đoàn
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {media.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="relative w-20 h-20 flex-shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg shadow"
                />
                <div className="absolute bottom-1 right-1 bg-white/80 rounded-full p-1">
                  <PlayCircle className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                      item.type
                    )}`}
                  >
                    {item.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {item.title}
                </h3>
                <audio controls src={item.url} className="w-full mt-2" />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <motion.a
            href="/media"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Xem tất cả media
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
