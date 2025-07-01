import { motion } from "framer-motion";
import { Clock, MapPin, User } from "lucide-react";

export default function MassesSection({ masses }) {
  if (!masses) return null;
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Lịch Thánh Lễ
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Thông tin các thánh lễ trong ngày tại Giáo Xứ Bắc Thịnh
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {masses.map((mass, index) => (
          <motion.div
            key={mass.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden p-6 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {mass.time}
              </span>
              <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {mass.type}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4" />
              {mass.location}
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <User className="w-4 h-4" />
              {mass.celebrant}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
              {mass.note}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
