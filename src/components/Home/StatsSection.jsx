import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    {
      title: "Thành viên",
      value: "1,250+",
      description: "Tín hữu đăng ký",
      icon: "👥",
    },
    {
      title: "Thánh lễ",
      value: "7",
      description: "Lễ mỗi tuần",
      icon: "⛪",
    },
    {
      title: "Hoạt động",
      value: "15+",
      description: "Sự kiện hàng tháng",
      icon: "📅",
    },
    {
      title: "Tình nguyện",
      value: "50+",
      description: "Tình nguyện viên",
      icon: "🤝",
    },
  ];

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Thống kê của chúng tôi
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Những con số thể hiện sự phát triển của cộng đoàn
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-3">{stat.icon}</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stat.value}
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {stat.title}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {stat.description}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
