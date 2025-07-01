import { motion } from "framer-motion";
import { Clock, MapPin, Users } from "lucide-react";

export default function TodayMasses() {
  const masses = [
    {
      time: "06:00",
      type: "Thánh lễ sáng",
      location: "Nhà thờ chính",
      attendees: "150+",
    },
    {
      time: "18:00",
      type: "Thánh lễ chiều",
      location: "Nhà thờ chính",
      attendees: "200+",
    },
    {
      time: "20:00",
      type: "Thánh lễ tối",
      location: "Nhà thờ chính",
      attendees: "120+",
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Thánh lễ hôm nay</h2>
        <p className="text-blue-100">
          Lịch lễ ngày{" "}
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
          {masses.map((mass, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {mass.time}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {mass.type}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <MapPin className="w-4 h-4" />
                  {mass.location}
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <Users className="w-4 h-4" />
                  {mass.attendees}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Xem lịch lễ đầy đủ
        </motion.button>
      </div>
    </motion.div>
  );
}
