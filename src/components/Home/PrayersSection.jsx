import { motion } from "framer-motion";
import { BookOpen, Heart, Clock, ArrowRight, Star } from "lucide-react";

export default function PrayersSection({ prayers }) {
  if (!prayers) return null;

  const getCategoryColor = (category) => {
    const colors = {
      "Kinh chính":
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Kinh gia đình":
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Kinh cầu nguyện":
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return (
      colors[category] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Kinh nguyện nổi bật</h2>
        <p className="text-pink-100">
          Những lời cầu nguyện quan trọng trong đời sống đức tin
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {prayers.map((prayer, index) => (
            <motion.div
              key={prayer.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                prayer.featured
                  ? "ring-2 ring-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {prayer.featured && (
                      <Star className="w-4 h-4 text-yellow-500" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {prayer.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        prayer.category
                      )}`}
                    >
                      {prayer.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                    {prayer.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{prayer.duration}</span>
                    </div>

                    <motion.a
                      href={`/prayers/${prayer.id}`}
                      className="inline-flex items-center gap-1 text-pink-600 dark:text-pink-400 text-sm font-medium hover:gap-2 transition-all duration-200"
                      whileHover={{ x: 3 }}
                    >
                      Đọc đầy đủ
                      <ArrowRight className="w-3 h-3" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <motion.a
            href="/prayers"
            className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Xem tất cả kinh nguyện
          </motion.a>
          <motion.button
            className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Yêu thích"
          >
            <Heart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
