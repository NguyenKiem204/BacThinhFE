import { motion } from "framer-motion";
import { BookOpen, Calendar, Heart } from "lucide-react";

export default function TodayReadings() {
  const readings = [
    {
      type: "Bài đọc I",
      reference: "Is 2,1-5",
      title: "Thiên Chúa sẽ dạy chúng ta biết đường lối của Người",
      summary:
        "Ngôn sứ Isaia loan báo về thời đại hòa bình khi mọi dân tộc sẽ tìm đến Chúa.",
    },
    {
      type: "Thánh vịnh",
      reference: "Tv 121",
      title: "Tôi ngước mắt nhìn lên núi",
      summary: "Thánh vịnh ca ngợi sự bảo vệ và chăm sóc của Thiên Chúa.",
    },
    {
      type: "Bài đọc II",
      reference: "Rm 13,11-14",
      title: "Đã đến lúc anh em phải thức dậy",
      summary:
        "Thánh Phaolô khuyến khích các tín hữu sống trong ánh sáng của Chúa Kitô.",
    },
    {
      type: "Tin Mừng",
      reference: "Mt 24,37-44",
      title: "Anh em hãy sẵn sàng",
      summary:
        "Chúa Giêsu dạy về sự cần thiết phải luôn sẵn sàng cho ngày Chúa đến.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Bài đọc hôm nay</h2>
        <p className="text-green-100">
          Lời Chúa ngày{" "}
          {new Date().toLocaleDateString("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {readings.map((reading, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
                      {reading.type}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                      {reading.reference}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {reading.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {reading.summary}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Đọc đầy đủ
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Lưu lại
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
